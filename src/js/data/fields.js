export const GROUPS = [
  ["server", "服务器管理", "名称、密码、端口、跨平台、日志、备份与远程管理。"],
  ["performance", "性能与据点", "据点数量、工作帕鲁、建筑上限和同步距离。"],
  ["balance", "游戏倍率", "时间、经验、掉落、采集、孵蛋、负重和装备耐久。"],
  ["playerPal", "玩家与帕鲁", "玩家和帕鲁的伤害、饥饿、耐力与生命恢复。"],
  ["features", "玩法功能", "快旅、袭击、随机帕鲁、出生点、玩家列表等开关。"],
  ["pvp", "PvP 与死亡", "PvP、硬核、死亡惩罚、复活惩罚和击杀掉落。"],
  ["advanced", "高级参数", "Mod、科技禁用、统计点分配、全局帕鲁终端等。"]
];

export const FIELD_SOURCE = `
Difficulty|features|select|None|难度|服务器难度。常规服务器通常保持 None。|None
RandomizerType|features|select|None|帕鲁随机模式|帕鲁刷新随机化：None 不随机，Region 按区域随机，All 全局随机。|None,Region,All
RandomizerSeed|features|string||随机种子|启用帕鲁随机化时使用的种子值。|
bIsRandomizerPalLevelRandom|features|boolean|False|野外帕鲁等级完全随机|开启后野外帕鲁等级完全随机；关闭时按区域预期等级范围随机。|
DayTimeSpeedRate|balance|float|1.000000|白天流逝速度|白天时间推进速度倍率。|
NightTimeSpeedRate|balance|float|1.000000|夜晚流逝速度|夜晚时间推进速度倍率。|
ExpRate|balance|float|1.000000|经验值倍率|获得经验值倍率。|
PalCaptureRate|balance|float|1.000000|捕捉概率倍率|帕鲁捕捉成功率倍率。|
PalSpawnNumRate|balance|float|1.000000|帕鲁出现数量倍率|帕鲁刷新数量倍率，会影响服务器性能。|
PalDamageRateAttack|playerPal|float|1.000000|帕鲁造成伤害倍率|帕鲁攻击造成的伤害倍率。|
PalDamageRateDefense|playerPal|float|1.000000|帕鲁承受伤害倍率|帕鲁受到的伤害倍率。|
PlayerDamageRateAttack|playerPal|float|1.000000|玩家造成伤害倍率|玩家攻击造成的伤害倍率。|
PlayerDamageRateDefense|playerPal|float|1.000000|玩家承受伤害倍率|玩家受到的伤害倍率。|
PlayerStomachDecreaceRate|playerPal|float|1.000000|玩家饱食度下降倍率|玩家饥饿消耗速度倍率。|
PlayerStaminaDecreaceRate|playerPal|float|1.000000|玩家耐力下降倍率|玩家耐力消耗速度倍率。|
PlayerAutoHPRegeneRate|playerPal|float|1.000000|玩家自然回血倍率|玩家自然生命恢复倍率。|
PlayerAutoHpRegeneRateInSleep|playerPal|float|1.000000|玩家睡眠回血倍率|玩家睡眠时生命恢复倍率。|
PalStomachDecreaceRate|playerPal|float|1.000000|帕鲁饱食度下降倍率|帕鲁饥饿消耗速度倍率。|
PalStaminaDecreaceRate|playerPal|float|1.000000|帕鲁耐力下降倍率|帕鲁耐力消耗速度倍率。|
PalAutoHPRegeneRate|playerPal|float|1.000000|帕鲁自然回血倍率|帕鲁自然生命恢复倍率。|
PalAutoHpRegeneRateInSleep|playerPal|float|1.000000|帕鲁睡眠回血倍率|帕鲁在帕鲁终端或睡眠时生命恢复倍率。|
BuildObjectHpRate|performance|float|1.000000|建筑生命值倍率|建筑物生命值倍率。|
BuildObjectDamageRate|balance|float|1.000000|建筑受伤倍率|对建筑物造成伤害的倍率。|
BuildObjectDeteriorationDamageRate|balance|float|1.000000|建筑劣化速度倍率|建筑物劣化速度倍率。|
CollectionDropRate|balance|float|1.000000|采集物掉落倍率|可采集资源获得量倍率。|
CollectionObjectHpRate|balance|float|1.000000|采集对象生命倍率|可采集对象生命值倍率。|
CollectionObjectRespawnSpeedRate|balance|float|1.000000|采集对象重生间隔倍率|可采集对象重生间隔倍率。|
EnemyDropItemRate|balance|float|1.000000|敌人掉落倍率|掉落物品数量倍率。|
DeathPenalty|pvp|select|Item|死亡惩罚|死亡后掉落规则。|None,Item,ItemAndEquipment,All
bEnablePlayerToPlayerDamage|pvp|boolean|False|启用玩家互伤|是否允许玩家对玩家造成伤害。|
bEnableFriendlyFire|pvp|boolean|False|启用友军伤害|是否允许友方伤害。|
bEnableInvaderEnemy|features|boolean|True|启用袭击事件|是否启用袭击事件。|
EnablePredatorBossPal|features|boolean|True|启用猛兽 Boss 帕鲁|是否启用 Predator Boss Pal。|
bEnableVoiceChat|features|boolean|False|启用游戏内语音|是否启用游戏内语音聊天。|
VoiceChatMaxVolumeDistance|features|float|3000.000000|语音最大音量距离|语音聊天在此距离内保持最大音量；官方 1.0.0 参数。|
VoiceChatZeroVolumeDistance|features|float|15000.000000|语音静音距离|语音聊天在此距离外音量为 0；官方 1.0.0 参数。|
bEnableBuildingPlayerUIdDisplay|features|boolean|False|显示建筑创建者玩家 ID|是否在建筑结构上显示创建者的玩家 ID。|
bActiveUNKO|advanced|boolean|False|启用牧场伙伴赠礼|控制牧场伙伴给玩家送东西的速度和触发。|
bEnableAimAssistPad|features|boolean|True|手柄辅助瞄准|是否启用手柄辅助瞄准。|
bEnableAimAssistKeyboard|features|boolean|False|键鼠辅助瞄准|是否启用键盘鼠标辅助瞄准。|
DropItemMaxNum|balance|integer|3000|掉落物最大存在数量|世界中掉落物品的最大存在数量。|
PhysicsActiveDropItemMaxNum|performance|integer|-1|物理掉落物最大数量|可使用物理行为的掉落物最大数量；-1 表示使用游戏默认控制。|
DropItemMaxNum_UNKO|advanced|integer|100|牧场伙伴赠礼数量上限|控制牧场伙伴给你送东西的数量上限。|
BaseCampMaxNum|performance|integer|128|全地图据点最大数量|全地图据点数量上限。|
BaseCampMaxNumInGuild|performance|integer|4|公会据点最大数量|每个公会的据点数量上限，官方说明默认 4、最大 10。|
BaseCampWorkerMaxNum|performance|integer|15|据点工作帕鲁上限|每个据点可工作的帕鲁数量上限，官方说明最大 50。|
DropItemAliveMaxHours|balance|float|1.000000|掉落物存活小时|掉落物品保留的最大小时数。|
bAutoResetGuildNoOnlinePlayers|features|boolean|False|自动清理离线公会|公会无人登录时自动删除建筑和据点帕鲁。|
AutoResetGuildTimeNoOnlinePlayers|features|float|72.000000|离线公会清理时间|触发自动清理前的离线时长；关闭自动清理时忽略。|
GuildPlayerMaxNum|server|integer|20|公会玩家最大数量|单个公会的玩家数量上限。|
PalEggDefaultHatchingTime|balance|float|1.000000|巨大蛋孵化小时|巨大蛋孵化所需时间；其他蛋也会按规则需要孵化时间。|
WorkSpeedRate|balance|float|1.000000|工作速度倍率|工作速度倍率。|
MonsterFarmActionSpeedRate|balance|float|1.000000|牧场产物速度倍率|牧场放牧产出物品的速度倍率；官方 1.0.0 参数。|
AutoSaveSpan|server|float|30.000000|自动保存间隔|服务器自动保存间隔。|
CrossplayPlatforms|server|array|Steam,Xbox,PS5,Mac|允许连接平台|允许连接服务器的平台，官方默认 Steam、Xbox、PS5、Mac。|
LogFormatType|server|select|Text|日志格式|服务器日志格式。|Text,Json
bIsMultiplay|features|boolean|False|多人模式|是否启用多人模式。|
bIsPvP|pvp|boolean|False|启用 PvP|是否启用 PvP。|
bHardcore|pvp|boolean|False|硬核模式|启用后死亡不能复活。|
bPalLost|pvp|boolean|False|死亡永久失去帕鲁|死亡时永久失去帕鲁。|
bCharacterRecreateInHardcore|pvp|boolean|False|硬核死亡后允许重建角色|硬核模式死亡后是否允许重新创建角色。|
bCanPickupOtherGuildDeathPenaltyDrop|pvp|boolean|False|可拾取其他公会死亡掉落|是否允许拾取其他公会玩家的死亡惩罚掉落。|
bEnableNonLoginPenalty|features|boolean|True|启用未登录惩罚|是否启用未登录惩罚。|
bEnableFastTravel|features|boolean|True|启用快速旅行|是否允许快速旅行。|
bIsStartLocationSelectByMap|features|boolean|False|允许地图选择出生点|是否允许玩家选择起始地点。|
bExistPlayerAfterLogout|features|boolean|False|登出后角色留在原地|登出后玩家是否在当前位置进入睡眠状态。|
bEnableDefenseOtherGuildPlayer|features|boolean|False|据点防御其他公会玩家|是否在据点内防御其他公会玩家。|
bInvisibleOtherGuildBaseCampAreaFX|features|boolean|False|隐藏其他公会据点区域特效|是否隐藏其他公会据点区域特效。|
bBuildAreaLimit|features|boolean|False|建筑区域限制|阻止在快速旅行点等结构附近建筑。|
ItemWeightRate|balance|float|1.000000|物品重量倍率|物品重量倍率。|
bShowPlayerList|features|boolean|False|显示在线玩家列表|在 ESC 菜单显示玩家列表。|
CoopPlayerMaxNum|server|integer|4|合作玩家最大数量|合作模式玩家数量上限。|
ServerPlayerMaxNum|server|integer|32|服务器玩家最大数量|可加入服务器的玩家数量上限。|
ServerName|server|string|Default Palworld Server|服务器名称|服务器名称。|
ServerDescription|server|string||服务器描述|服务器描述。|
AdminPassword|server|string||管理员密码|获取服务器管理员权限使用的密码。|
ServerPassword|server|string||服务器密码|加入服务器需要的密码。|
PublicPort|server|integer|8211|公共端口|社区服务器对外显示端口，不改变服务器监听端口。|
PublicIP|server|string||公共 IP|社区服务器显式指定外部公共 IP。|
RCONEnabled|server|boolean|False|启用 RCON|是否启用 RCON。|
RCONPort|server|integer|25575|RCON 端口|RCON 使用的端口。|
RESTAPIEnabled|server|boolean|False|启用 REST API|是否启用 REST API。|
RESTAPIPort|server|integer|8212|REST API 端口|REST API 监听端口。|
bIsUseBackupSaveData|server|boolean|True|启用世界备份|启用世界备份；官方提示会增加磁盘负载。|
Region|server|string||地区|服务器地区字段。|
bUseAuth|server|boolean|True|启用认证|是否启用认证。|
BanListURL|server|string|https://b.palworldgame.com/api/banlist.txt|封禁列表 URL|封禁列表地址。|
SupplyDropSpan|balance|integer|180|陨石或空投间隔分钟|陨石或补给空投出现间隔，单位分钟。|
ChatPostLimitPerMinute|server|integer|30|每分钟聊天上限|每分钟允许发送的聊天消息数量。|
MaxBuildingLimitNum|performance|integer|0|每玩家建筑数量上限|每名玩家建筑数量上限，0 表示无限制。|
ServerReplicatePawnCullDistance|performance|float|15000.000000|帕鲁同步距离|玩家与帕鲁同步距离，官方说明 5000 到 15000 厘米。|
bAllowGlobalPalboxExport|advanced|boolean|True|允许全局帕鲁终端导出|允许保存到全局帕鲁终端。|
bAllowGlobalPalboxImport|advanced|boolean|False|允许全局帕鲁终端导入|允许从全局帕鲁终端读取。|
EquipmentDurabilityDamageRate|balance|float|1.000000|装备耐久损耗倍率|装备耐久损耗倍率。|
ItemContainerForceMarkDirtyInterval|performance|float|1.000000|容器强制重同步间隔|容器 UI 打开时强制重新同步的间隔，单位秒。|
PlayerDataPalStorageUpdateCheckTickInterval|performance|float|1.000000|帕鲁终端数据检查间隔|玩家帕鲁存储数据更新检查间隔，单位秒。|
ItemCorruptionMultiplier|balance|float|1.000000|物品腐败速度倍率|物品腐败速度倍率。|
bEnableFastTravelOnlyBaseCamp|features|boolean|False|仅据点之间可快速旅行|限制快速旅行只能在据点之间进行。|
bAllowClientMod|server|boolean|True|允许客户端 Mod|允许启用 Mod 的玩家加入服务器。|
bIsShowJoinLeftMessage|server|boolean|True|显示加入离开消息|专用服务器中显示玩家加入和离开消息。|
DenyTechnologyList|advanced|array||禁用科技列表|禁用指定科技，填写 Technology ID，用逗号分隔。|
GuildRejoinCooldownMinutes|features|integer|0|重新加入公会冷却分钟|重新加入公会的冷却时间，单位分钟。|
AutoTransferMasterCheckIntervalSeconds|features|float|3600.000000|会长自动转移检查间隔|检查公会会长自动转移条件的间隔，单位秒。|
AutoTransferMasterThresholdDays|features|integer|14|会长自动转移阈值天数|会长离线达到该天数后触发自动转移条件。|
MaxGuildsPerFrame|performance|integer|10|每帧处理公会数|自动处理公会相关逻辑时每帧最多处理的公会数量。|
BlockRespawnTime|pvp|float|5.000000|复活基础冷却秒|死亡后可复活前的冷却时间，单位秒。|
RespawnPenaltyDurationThreshold|pvp|float|0.000000|复活惩罚生存阈值秒|应用后续死亡复活冷却倍率的生存时间阈值。|
RespawnPenaltyTimeScale|pvp|float|2.000000|复活惩罚时间倍率|后续死亡时应用到复活冷却的倍率。|
bDisplayPvPItemNumOnWorldMap_BaseCamp|pvp|boolean|False|地图显示基地 PvP 物品数量|地图上是否显示各基地 PvP 专属物品数量。|
bDisplayPvPItemNumOnWorldMap_Player|pvp|boolean|False|地图显示玩家 PvP 物品数量|地图上是否显示玩家位置和 PvP 专属物品数量。|
AdditionalDropItemWhenPlayerKillingInPvPMode|pvp|string|PlayerDropItem|PvP 击杀附加掉落物 ID|启用 PvP 击杀附加掉落时掉落的物品 ID。|
AdditionalDropItemNumWhenPlayerKillingInPvPMode|pvp|integer|1|PvP 击杀附加掉落数量|启用 PvP 击杀附加掉落时掉落数量。|
bAdditionalDropItemWhenPlayerKillingInPvPMode|pvp|boolean|False|启用 PvP 击杀附加掉落|PvP 下玩家被击杀时是否掉落特殊物品。|
bAllowEnhanceStat_Health|advanced|boolean|True|允许强化生命|允许给生命分配属性点。|
bAllowEnhanceStat_Attack|advanced|boolean|True|允许强化攻击|允许给攻击分配属性点。|
bAllowEnhanceStat_Stamina|advanced|boolean|True|允许强化耐力|允许给耐力分配属性点。|
bAllowEnhanceStat_Weight|advanced|boolean|True|允许强化负重|允许给负重分配属性点。|
bAllowEnhanceStat_WorkSpeed|advanced|boolean|True|允许强化工作速度|允许给工作速度分配属性点。|
BuildingNameDisplayCacheTTLSeconds|performance|integer|60|建筑名称显示缓存秒数|建筑名称显示缓存保留时间，单位秒。|
`;

export const RANGE_BY_KEY = {
  BaseCampMaxNumInGuild: [1, 10, 1],
  BaseCampWorkerMaxNum: [1, 50, 1],
  ServerPlayerMaxNum: [1, 512, 1],
  CoopPlayerMaxNum: [1, 4, 1],
  GuildPlayerMaxNum: [1, 100, 1],
  DropItemMaxNum: [0, 10000, 100],
  DropItemMaxNum_UNKO: [0, 1000, 10],
  PhysicsActiveDropItemMaxNum: [-1, 10000, 100],
  BaseCampMaxNum: [1, 512, 1],
  MaxBuildingLimitNum: [0, 10000, 100],
  ServerReplicatePawnCullDistance: [5000, 15000, 500],
  ChatPostLimitPerMinute: [0, 100, 1],
  SupplyDropSpan: [0, 1000, 10],
  GuildRejoinCooldownMinutes: [0, 1440, 10],
  AutoTransferMasterCheckIntervalSeconds: [0, 86400, 300],
  AutoTransferMasterThresholdDays: [0, 365, 1],
  MaxGuildsPerFrame: [1, 100, 1],
  AdditionalDropItemNumWhenPlayerKillingInPvPMode: [0, 100, 1],
  PublicPort: [1, 65535, 1],
  RCONPort: [1, 65535, 1],
  RESTAPIPort: [1, 65535, 1],
  VoiceChatMaxVolumeDistance: [0, 50000, 500],
  VoiceChatZeroVolumeDistance: [0, 50000, 500],
  BuildingNameDisplayCacheTTLSeconds: [0, 3600, 10]
};

export const SELECT_TEXT = {
  DeathPenalty: {
    None: "无掉落",
    Item: "掉落物品，不掉装备",
    ItemAndEquipment: "掉落物品和装备",
    All: "掉落物品、装备和队伍帕鲁"
  },
  RandomizerType: {
    None: "不随机",
    Region: "按区域随机",
    All: "全局随机"
  },
  LogFormatType: {
    Text: "文本",
    Json: "JSON"
  },
  Difficulty: {
    None: "默认"
  }
};
