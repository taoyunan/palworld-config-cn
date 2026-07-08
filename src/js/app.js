import { GROUPS, FIELD_SOURCE, RANGE_BY_KEY, SELECT_TEXT } from './data/fields.js';
import { TEMPLATES } from './data/templates.js';
import { TECHNOLOGIES } from './data/technologies.js';

const FIELDS = FIELD_SOURCE.trim().split("\n").map((line) => {
  const [key, group, type, defaultValue, label, desc, optionText = ""] = line.split("|");
  const options = optionText ? optionText.split(",").map((item) => item.trim()).filter(Boolean) : [];
  return { key, group, type, defaultValue, label, desc, options };
});

const FIELD_BY_KEY = new Map(FIELDS.map((field) => [field.key, field]));
const state = new Map(FIELDS.map((field) => [field.key, field.defaultValue]));

const editor = document.querySelector("#editor");
const templateGrid = document.querySelector("#templateGrid");
const groupNav = document.querySelector("#groupNav");
const outputText = document.querySelector("#outputText");
const searchInput = document.querySelector("#searchInput");
const fieldCount = document.querySelector("#fieldCount");
const changedCount = document.querySelector("#changedCount");
const toast = document.querySelector("#toast");
const technologyDialog = document.querySelector("#technologyDialog");
const technologySearch = document.querySelector("#technologySearch");
const technologyList = document.querySelector("#technologyList");
const selectedTechnologyList = document.querySelector("#selectedTechnologyList");
let selectedTechnologies = new Set();
let missingFields = new Set();
let outputParseTimer = 0;
const TECHNOLOGY_BY_ID = new Map(TECHNOLOGIES.map((technology) => [technology.id, technology]));

function getRange(field) {
  if (RANGE_BY_KEY[field.key]) return RANGE_BY_KEY[field.key];
  if (field.type === "float" && /Rate|Multiplier/.test(field.key)) return [0.1, 5, 0.1];
  if (field.type === "float" && /Time|Hours|Span|Interval|Threshold/.test(field.key)) return [0, 240, 1];
  return null;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderNav() {
  groupNav.innerHTML = GROUPS.map(([id, label]) => {
    const count = FIELDS.filter((field) => field.group === id).length;
    return `<button type="button" data-group="${id}">${label}<span>${count}</span></button>`;
  }).join("");
}

function renderTemplates() {
  templateGrid.innerHTML = TEMPLATES.map((template) => `
    <article class="template-card">
      <div>
        <h3>${template.name}</h3>
        <p>${template.desc}</p>
      </div>
      <div class="template-tags">
        ${template.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <p class="input-hint">覆盖 ${Object.keys(template.values).length} 项配置</p>
      <button type="button" class="primary-btn" data-template="${template.id}">套用模板</button>
    </article>
  `).join("");
}

function renderEditor() {
  editor.innerHTML = GROUPS.map(([id, label, desc]) => {
    const fields = FIELDS.filter((field) => field.group === id);
    const rows = fields.map(renderField).join("");
    return `
      <section class="group-section" id="group-${id}" data-group-section="${id}">
        <div class="group-head">
          <div>
            <h3>${label}</h3>
            <p>${desc}</p>
          </div>
          <span class="group-count">${fields.length} 项</span>
        </div>
        <div class="field-list">${rows}</div>
      </section>
    `;
  }).join("");
}

function renderField(field) {
  const value = state.get(field.key) ?? "";
  const searchText = `${field.key} ${field.label} ${field.desc}`.toLowerCase();
  return `
    <article class="field-row" data-field="${field.key}" data-search="${escapeHtml(searchText)}">
      <div class="field-meta">
        <div class="field-title">
          <strong>${field.label}</strong>
          <span class="key-chip">${field.key}</span>
        </div>
        <p class="field-desc">${field.desc}</p>
      </div>
      <div class="control-wrap">
        ${renderControl(field, value)}
        ${renderHint(field)}
      </div>
    </article>
  `;
}

function renderControl(field, value) {
  if (field.type === "boolean") {
    const isTrue = value === "True";
    return `
      <div class="toggle" role="group" aria-label="${field.label}">
        <button type="button" data-boolean="${field.key}" data-value="True" class="${isTrue ? "active" : ""}">开启</button>
        <button type="button" data-boolean="${field.key}" data-value="False" class="${!isTrue ? "active" : ""}">关闭</button>
      </div>
    `;
  }

  if (field.type === "select") {
    const choices = field.options.map((option) => {
      const label = SELECT_TEXT[field.key]?.[option] ? `${SELECT_TEXT[field.key][option]} (${option})` : option;
      return `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(label)}</option>`;
    }).join("");
    return `<select data-input="${field.key}">${choices}</select>`;
  }

  if (field.type === "array") {
    if (field.key === "DenyTechnologyList") {
      return `
        <div class="array-picker">
          <input type="text" data-input="${field.key}" value="${escapeHtml(value)}" placeholder="点击右侧按钮从科技列表选择">
          <button type="button" class="ghost-btn compact" id="openTechnologyBtn">选择科技</button>
        </div>
      `;
    }
    return `<input type="text" data-input="${field.key}" value="${escapeHtml(value)}" placeholder="用英文逗号分隔多个值">`;
  }

  if (field.type === "integer" || field.type === "float") {
    const range = getRange(field);
    if (range) {
      const [min, max, step] = range;
      return `
        <div class="range-line">
          <input type="range" data-range="${field.key}" min="${min}" max="${max}" step="${step}" value="${escapeHtml(value || min)}">
          <input type="number" data-input="${field.key}" min="${min}" max="${max}" step="${step}" value="${escapeHtml(value)}">
        </div>
      `;
    }
    return `<input type="number" data-input="${field.key}" value="${escapeHtml(value)}" step="${field.type === "float" ? "0.1" : "1"}">`;
  }

  return `<input type="text" data-input="${field.key}" value="${escapeHtml(value)}">`;
}

function renderHint(field) {
  const range = getRange(field);
  const parts = [];
  if (range) parts.push(`建议范围：${range[0]} 到 ${range[1]}`);
  if (field.type === "array") parts.push(field.key === "DenyTechnologyList" ? "示例：PALBOX, RepairBench" : "示例：Steam, Xbox, PS5, Mac");
  if (!parts.length) return "";
  return `<span class="input-hint">${parts.join("；")}</span>`;
}

function refreshChangedRows() {
  let changed = 0;
  for (const field of FIELDS) {
    const isChanged = String(state.get(field.key) ?? "") !== String(field.defaultValue ?? "");
    const row = document.querySelector(`[data-field="${CSS.escape(field.key)}"]`);
    if (row) {
      row.classList.toggle("is-changed", isChanged);
      row.classList.toggle("is-missing", missingFields.has(field.key));
    }
    if (isChanged) changed += 1;
  }
  fieldCount.textContent = `${FIELDS.length} 项配置`;
  changedCount.textContent = missingFields.size
    ? `${changed} 项已修改，${missingFields.size} 项缺失`
    : `${changed} 项已修改`;
}

function setValue(key, value, syncDom = true) {
  const field = FIELD_BY_KEY.get(key);
  if (!field) return;
  state.set(key, normalizeValueForField(field, value));
  missingFields.delete(key);

  if (syncDom) syncFieldControl(key);

  updateOutput();
}

function syncFieldControl(key) {
  document.querySelectorAll(`[data-input="${CSS.escape(key)}"]`).forEach((input) => {
    input.value = state.get(key);
  });
  document.querySelectorAll(`[data-range="${CSS.escape(key)}"]`).forEach((input) => {
    input.value = state.get(key) || input.min || 0;
  });
  document.querySelectorAll(`[data-boolean="${CSS.escape(key)}"]`).forEach((button) => {
    button.classList.toggle("active", button.dataset.value === state.get(key));
  });
}

function normalizeValueForField(field, value) {
  if (field.type === "boolean") return String(value).toLowerCase() === "true" ? "True" : "False";
  if (field.type === "integer") return value === "" ? "" : String(Math.round(Number(value)));
  if (field.type === "float") {
    if (value === "") return "";
    const number = Number(value);
    if (!Number.isFinite(number)) return field.defaultValue;
    return number.toFixed(6);
  }
  return String(value ?? "").trim();
}

function formatIniValue(field, rawValue) {
  const value = String(rawValue ?? "");
  if (field.type === "string") return `"${value.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
  if (field.type === "array") return formatArray(field, value);
  return value || field.defaultValue || "";
}

function formatArray(field, value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("(") && trimmed.endsWith(")")) return trimmed;
  if (!trimmed) return "()";

  const items = splitTopLevel(trimmed).map((item) => item.trim()).filter(Boolean);
  if (field.key === "DenyTechnologyList") {
    const quoted = items.map((item) => {
      if ((item.startsWith('"') && item.endsWith('"')) || item.startsWith("'")) return item.replaceAll("'", '"');
      return `"${item.replaceAll('"', '\\"')}"`;
    });
    return `(${quoted.join(",")})`;
  }
  return `(${items.join(",")})`;
}

function buildOptionSettings() {
  const lines = FIELDS.map((field) => `  ${field.key}=${formatIniValue(field, state.get(field.key))}`);
  return `OptionSettings=(\n${lines.join(",\n")}\n)`;
}

function buildIni() {
  return [
    "[/Script/Pal.PalGameWorldSettings]",
    buildOptionSettings(),
    ""
  ].join("\n");
}

function updateOutput() {
  outputText.value = buildIni();
  refreshChangedRows();
  applySearch();
}

function splitTopLevel(text) {
  const parts = [];
  let current = "";
  let quote = null;
  let depth = 0;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const previous = text[index - 1];

    if ((char === '"' || char === "'") && previous !== "\\") {
      quote = quote === char ? null : quote || char;
    }

    if (!quote) {
      if (char === "(") depth += 1;
      if (char === ")") depth -= 1;
      if (char === "," && depth === 0) {
        parts.push(current);
        current = "";
        continue;
      }
    }

    current += char;
  }

  if (current) parts.push(current);
  return parts;
}

function parseOptionSettings(text) {
  const start = text.indexOf("OptionSettings=");
  let bodySource = text.trim();

  if (start >= 0) {
    const open = text.indexOf("(", start);
    if (open < 0) return null;
    let depth = 0;
    let quote = null;
    for (let index = open; index < text.length; index += 1) {
      const char = text[index];
      const previous = text[index - 1];
      if ((char === '"' || char === "'") && previous !== "\\") quote = quote === char ? null : quote || char;
      if (!quote && char === "(") depth += 1;
      if (!quote && char === ")") {
        depth -= 1;
        if (depth === 0) {
          bodySource = text.slice(open + 1, index);
          break;
        }
      }
    }
  } else if (bodySource.startsWith("(") && bodySource.endsWith(")")) {
    bodySource = bodySource.slice(1, -1);
  }

  const values = new Map();
  for (const part of splitTopLevel(bodySource)) {
    const equal = part.indexOf("=");
    if (equal < 0) continue;
    const key = part.slice(0, equal).trim();
    const value = part.slice(equal + 1).trim();
    if (!FIELD_BY_KEY.has(key)) continue;
    values.set(key, parseIniValue(FIELD_BY_KEY.get(key), value));
  }
  return values.size ? values : null;
}

function parseIniValue(field, value) {
  if (field.type === "string") {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.slice(1, -1).replaceAll('\\"', '"').replaceAll("\\\\", "\\");
    }
    return value;
  }

  if (field.type === "array") {
    if (!value.startsWith("(") || !value.endsWith(")")) return value;
    const body = value.slice(1, -1);
    return splitTopLevel(body).map((item) => item.trim().replace(/^["']|["']$/g, "")).filter(Boolean).join(", ");
  }

  return value;
}

function applyOutputText(text, syncOutput = true, showFeedback = true) {
  const parsed = parseOptionSettings(text);
  if (!parsed) {
    if (showFeedback) showToast("没有从生成结果中识别到有效配置。", true);
    return;
  }

  applyParsedSettings(parsed, syncOutput);
  if (showFeedback) showImportSummary(parsed.size);
}

function applyParsedSettings(parsed, syncOutput = true) {
  missingFields = new Set(FIELDS.filter((field) => !parsed.has(field.key)).map((field) => field.key));
  parsed.forEach((value, key) => {
    const field = FIELD_BY_KEY.get(key);
    if (!field) return;
    state.set(key, normalizeValueForField(field, value));
    syncFieldControl(key);
  });
  if (syncOutput) {
    updateOutput();
  } else {
    refreshChangedRows();
    applySearch();
  }
}

function showImportSummary(parsedCount) {
  if (missingFields.size) {
    showToast(`已读取 ${parsedCount} 项配置，缺失 ${missingFields.size} 项，已用红色标出。`, true);
    return;
  }
  showToast(`已读取 ${parsedCount} 项配置。`);
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleTotal = 0;

  document.querySelectorAll(".group-section").forEach((section) => {
    let visibleInGroup = 0;
    section.querySelectorAll(".field-row").forEach((row) => {
      const match = !query || row.dataset.search.includes(query);
      row.classList.toggle("hidden", !match);
      if (match) visibleInGroup += 1;
    });
    visibleTotal += visibleInGroup;
    section.classList.toggle("hidden", visibleInGroup === 0);
  });

  document.querySelectorAll("#groupNav button").forEach((button) => {
    const section = document.querySelector(`#group-${button.dataset.group}`);
    button.classList.toggle("hidden", section?.classList.contains("hidden"));
  });

  if (!visibleTotal && !document.querySelector(".empty-state")) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "没有匹配的配置项。";
    editor.append(empty);
  } else if (visibleTotal) {
    document.querySelector(".empty-state")?.remove();
  }
}

function resetAll() {
  resetFieldsToDefault();
  updateOutput();
  showToast("已恢复默认值。");
}

function resetFieldsToDefault() {
  missingFields.clear();
  FIELDS.forEach((field) => {
    state.set(field.key, field.defaultValue);
    syncFieldControl(field.key);
  });
}

function parseTechnologyValue(value) {
  return splitTopLevel(String(value ?? ""))
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function openTechnologyPicker() {
  selectedTechnologies = new Set(parseTechnologyValue(state.get("DenyTechnologyList")));
  technologySearch.value = "";
  renderSelectedTechnologies();
  renderTechnologyList();
  technologyDialog.showModal();
}

function renderSelectedTechnologies() {
  selectedTechnologyList.innerHTML = [...selectedTechnologies].map((id) => `
    <button type="button" data-remove-technology="${escapeHtml(id)}">${escapeHtml(getTechnologyLabel(id))} ×</button>
  `).join("");
}

function renderTechnologyList() {
  const query = technologySearch.value.trim().toLowerCase();
  const matched = TECHNOLOGIES.filter((technology) => {
    if (!query) return true;
    return `${technology.id} ${technology.zhName} ${technology.name}`.toLowerCase().includes(query);
  }).sort((a, b) => getTechnologyRank(a, query) - getTechnologyRank(b, query));

  technologyList.innerHTML = matched.map((technology) => {
    const active = selectedTechnologies.has(technology.id);
    return `
      <button type="button" class="technology-item ${active ? "active" : ""}" data-technology-id="${escapeHtml(technology.id)}">
        <strong>${escapeHtml(technology.zhName || technology.name)}</strong>
        <span>${escapeHtml(technology.id)}</span>
        <span>${escapeHtml(technology.name)}</span>
      </button>
    `;
  }).join("");
}

function getTechnologyLabel(id) {
  const technology = TECHNOLOGY_BY_ID.get(id);
  if (!technology) return id;
  return `${technology.zhName || technology.name} (${id})`;
}

function getTechnologyRank(technology, query) {
  if (!query) return 0;
  const id = technology.id.toLowerCase();
  const zhName = (technology.zhName || "").toLowerCase();
  const name = technology.name.toLowerCase();
  if (zhName === query || id === query) return 0;
  if (zhName.startsWith(query) || id.startsWith(query)) return 1;
  if (name.startsWith(query)) return 2;
  return 3;
}

function applyTechnologySelection() {
  setValue("DenyTechnologyList", [...selectedTechnologies].join(", "), true);
  technologyDialog.close();
  showToast(`已选择 ${selectedTechnologies.size} 个禁用科技。`);
}

function applyTemplate(templateId) {
  const template = TEMPLATES.find((item) => item.id === templateId);
  if (!template) return;

  resetFieldsToDefault();
  Object.entries(template.values).forEach(([key, value]) => {
    const field = FIELD_BY_KEY.get(key);
    if (!field) return;
    state.set(key, normalizeValueForField(field, value));
    syncFieldControl(key);
  });
  updateOutput();
  showToast(`已套用「${template.name}」模板，覆盖 ${Object.keys(template.values).length} 项配置。`);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    outputText.focus();
    outputText.select();
    document.execCommand("copy");
    showToast(message);
  }
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.color = isError ? "var(--red)" : "var(--green)";
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.textContent = "";
  }, 2600);
}

function syncRangeForInput(key, value) {
  document.querySelectorAll(`[data-range="${CSS.escape(key)}"]`).forEach((range) => {
    range.value = value || range.min || 0;
  });
}

function handleEditorValueChange(event) {
  const control = event.target.closest("[data-input], [data-range]");
  if (!control || !editor.contains(control)) return;

  const inputKey = control.dataset.input;
  if (inputKey) {
    setValue(inputKey, control.value, false);
    syncRangeForInput(inputKey, control.value);
    return;
  }

  const rangeKey = control.dataset.range;
  if (rangeKey) setValue(rangeKey, control.value, true);
}

editor.addEventListener("input", handleEditorValueChange);
editor.addEventListener("change", handleEditorValueChange);

editor.addEventListener("click", (event) => {
  const button = event.target.closest("[data-boolean]");
  if (!button) return;
  setValue(button.dataset.boolean, button.dataset.value, true);
});

editor.addEventListener("click", (event) => {
  if (!event.target.closest("#openTechnologyBtn")) return;
  openTechnologyPicker();
});

groupNav.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-group]");
  if (!button) return;
  document.querySelector(`#group-${button.dataset.group}`)?.scrollIntoView({ block: "start" });
  document.querySelectorAll("#groupNav button").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
});

searchInput.addEventListener("input", applySearch);

templateGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-template]");
  if (!button) return;
  applyTemplate(button.dataset.template);
});

document.querySelector("#copyBtn").addEventListener("click", () => copyText(outputText.value, "INI 已复制到剪贴板。"));
document.querySelector("#copyOptionBtn").addEventListener("click", () => copyText(buildOptionSettings(), "OptionSettings 已复制。"));
document.querySelector("#selectAllBtn").addEventListener("click", () => {
  outputText.focus();
  outputText.select();
});
document.querySelector("#resetBtn").addEventListener("click", resetAll);

outputText.addEventListener("paste", () => {
  window.clearTimeout(outputParseTimer);
  outputParseTimer = window.setTimeout(() => applyOutputText(outputText.value), 0);
});

outputText.addEventListener("input", () => {
  window.clearTimeout(outputParseTimer);
  outputParseTimer = window.setTimeout(() => applyOutputText(outputText.value, false, false), 180);
});

technologySearch.addEventListener("input", renderTechnologyList);

technologyList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-technology-id]");
  if (!item) return;
  const id = item.dataset.technologyId;
  if (selectedTechnologies.has(id)) selectedTechnologies.delete(id);
  else selectedTechnologies.add(id);
  renderSelectedTechnologies();
  renderTechnologyList();
});

selectedTechnologyList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-remove-technology]");
  if (!item) return;
  selectedTechnologies.delete(item.dataset.removeTechnology);
  renderSelectedTechnologies();
  renderTechnologyList();
});

document.querySelector("#clearTechnologyBtn").addEventListener("click", () => {
  selectedTechnologies.clear();
  renderSelectedTechnologies();
  renderTechnologyList();
});

document.querySelector("#applyTechnologyBtn").addEventListener("click", applyTechnologySelection);

renderNav();
renderTemplates();
renderEditor();
updateOutput();
