export const TEMPLATES = [
  {
    id: "casual",
    name: "休闲探索",
    desc: "降低挫败感，适合小队开荒、轻松抓帕鲁和快速推进。",
    tags: ["PvE", "低惩罚", "快速孵化"],
    values: {
      DayTimeSpeedRate: "0.500000",
      NightTimeSpeedRate: "1.500000",
      ExpRate: "2.000000",
      PalCaptureRate: "1.500000",
      PalSpawnNumRate: "1.300000",
      CollectionDropRate: "2.000000",
      PlayerStomachDecreaceRate: "0.500000",
      PlayerStaminaDecreaceRate: "0.500000",
      PlayerAutoHPRegeneRate: "2.000000",
      PalStomachDecreaceRate: "0.500000",
      PalEggDefaultHatchingTime: "0.300000",
      WorkSpeedRate: "1.500000",
      BuildObjectDeteriorationDamageRate: "0.000000",
      DeathPenalty: "None",
      bEnableInvaderEnemy: "False",
      bIsPvP: "False"
    }
  },
  {
    id: "balanced",
    name: "均衡 PvE",
    desc: "略微加快养成但保留资源压力，适合长期公共 PvE 服务器。",
    tags: ["PvE", "长期服", "轻度加速"],
    values: {
      ExpRate: "1.500000",
      PalCaptureRate: "1.200000",
      CollectionDropRate: "1.500000",
      PalStomachDecreaceRate: "0.800000",
      WorkSpeedRate: "1.200000",
      PalEggDefaultHatchingTime: "15.000000",
      DeathPenalty: "Item",
      bEnableInvaderEnemy: "True",
      bIsPvP: "False"
    }
  },
  {
    id: "hardcore",
    name: "硬核生存",
    desc: "经验和捕捉更慢，生存消耗更高，死亡惩罚更重。",
    tags: ["挑战", "慢节奏", "高惩罚"],
    values: {
      NightTimeSpeedRate: "0.700000",
      ExpRate: "0.700000",
      PalCaptureRate: "0.700000",
      PalSpawnNumRate: "0.800000",
      EnemyDropItemRate: "0.500000",
      PlayerStomachDecreaceRate: "1.500000",
      PlayerStaminaDecreaceRate: "1.300000",
      PlayerDamageRateDefense: "1.500000",
      PalDamageRateDefense: "1.500000",
      PlayerAutoHPRegeneRate: "0.500000",
      PalEggDefaultHatchingTime: "72.000000",
      DeathPenalty: "All",
      bIsPvP: "False"
    }
  },
  {
    id: "pvp",
    name: "PvP 竞技",
    desc: "提高玩家对战强度，压低队伍帕鲁掉落风险，适合周期性竞技服。",
    tags: ["PvP", "竞技", "玩家互伤"],
    values: {
      ExpRate: "1.000000",
      PalCaptureRate: "1.000000",
      PalSpawnNumRate: "1.000000",
      PlayerDamageRateAttack: "1.200000",
      PlayerDamageRateDefense: "0.800000",
      PalDamageRateAttack: "0.900000",
      PalDamageRateDefense: "1.100000",
      DeathPenalty: "ItemAndEquipment",
      bEnablePlayerToPlayerDamage: "True",
      bIsPvP: "True",
      bCanPickupOtherGuildDeathPenaltyDrop: "True",
      bDisplayPvPItemNumOnWorldMap_Player: "True",
      bAdditionalDropItemWhenPlayerKillingInPvPMode: "False"
    }
  },
  {
    id: "breeding",
    name: "繁育与配种",
    desc: "大幅缩短孵化时间，提高捕捉和工作效率，适合配种刷词条。",
    tags: ["繁育", "效率", "低等待"],
    values: {
      ExpRate: "1.500000",
      PalCaptureRate: "1.800000",
      CollectionDropRate: "2.000000",
      CollectionObjectRespawnSpeedRate: "0.500000",
      PalEggDefaultHatchingTime: "0.100000",
      WorkSpeedRate: "3.000000",
      ItemWeightRate: "0.500000",
      BaseCampWorkerMaxNum: "30",
      DeathPenalty: "None"
    }
  },
  {
    id: "builder",
    name: "建造党",
    desc: "弱化建筑损坏和劣化，提高负重与采集，适合大型基地建设。",
    tags: ["建造", "基地", "采集"],
    values: {
      CollectionDropRate: "2.500000",
      CollectionObjectHpRate: "0.500000",
      CollectionObjectRespawnSpeedRate: "0.600000",
      BuildObjectHpRate: "3.000000",
      BuildObjectDamageRate: "0.300000",
      BuildObjectDeteriorationDamageRate: "0.000000",
      ItemWeightRate: "0.400000",
      BaseCampMaxNumInGuild: "8",
      BaseCampWorkerMaxNum: "35",
      MaxBuildingLimitNum: "0"
    }
  },
  {
    id: "performance",
    name: "性能优先",
    desc: "减少刷新、掉落和同步压力，适合机器配置一般或在线人数波动的服务器。",
    tags: ["稳定", "低负载", "多人"],
    values: {
      PalSpawnNumRate: "0.700000",
      DropItemMaxNum: "1500",
      DropItemMaxNum_UNKO: "50",
      DropItemAliveMaxHours: "0.500000",
      CollectionObjectRespawnSpeedRate: "1.500000",
      BaseCampMaxNumInGuild: "4",
      BaseCampWorkerMaxNum: "12",
      ServerReplicatePawnCullDistance: "8000.000000",
      bShowPlayerList: "True",
      bIsUseBackupSaveData: "True"
    }
  },
  {
    id: "largeCommunity",
    name: "大社区",
    desc: "面向 64 人左右的社区服，保留养成速度并控制掉落与同步压力。",
    tags: ["64人", "社区", "备份"],
    values: {
      ServerPlayerMaxNum: "64",
      ExpRate: "1.200000",
      PalCaptureRate: "1.100000",
      PalSpawnNumRate: "0.800000",
      DropItemMaxNum: "2000",
      DropItemAliveMaxHours: "0.500000",
      BaseCampMaxNumInGuild: "4",
      BaseCampWorkerMaxNum: "15",
      ServerReplicatePawnCullDistance: "10000.000000",
      bShowPlayerList: "True",
      ChatPostLimitPerMinute: "10",
      bIsUseBackupSaveData: "True"
    }
  },
  {
    id: "speedrun",
    name: "速通周目",
    desc: "大幅加速经验、资源和孵化，适合短期活动、周末服或快速体验。",
    tags: ["速通", "活动", "高倍率"],
    values: {
      DayTimeSpeedRate: "0.700000",
      NightTimeSpeedRate: "2.000000",
      ExpRate: "5.000000",
      PalCaptureRate: "2.000000",
      CollectionDropRate: "3.000000",
      EnemyDropItemRate: "2.000000",
      WorkSpeedRate: "3.000000",
      PalEggDefaultHatchingTime: "0.000000",
      PlayerStaminaDecreaceRate: "0.400000",
      PalStaminaDecreaceRate: "0.500000",
      DeathPenalty: "None"
    }
  },
  {
    id: "slowLife",
    name: "低倍慢服",
    desc: "放慢成长和资源获取，适合长期养老、强调交易和协作的服务器。",
    tags: ["低倍", "长期", "协作"],
    values: {
      DayTimeSpeedRate: "0.800000",
      NightTimeSpeedRate: "0.800000",
      ExpRate: "0.800000",
      PalCaptureRate: "0.900000",
      CollectionDropRate: "0.800000",
      EnemyDropItemRate: "0.800000",
      PalEggDefaultHatchingTime: "48.000000",
      WorkSpeedRate: "0.900000",
      DeathPenalty: "Item"
    }
  },
  {
    id: "solo",
    name: "独狼友好",
    desc: "适合一到两个人游玩，降低消耗并提升资源效率，不牺牲太多挑战。",
    tags: ["单人", "双人", "轻松"],
    values: {
      ExpRate: "2.000000",
      PalCaptureRate: "1.500000",
      CollectionDropRate: "2.000000",
      PlayerStomachDecreaceRate: "0.600000",
      PlayerStaminaDecreaceRate: "0.600000",
      PalStomachDecreaceRate: "0.700000",
      PalEggDefaultHatchingTime: "2.000000",
      DeathPenalty: "Item",
      CoopPlayerMaxNum: "2",
      bEnableInvaderEnemy: "False"
    }
  },
  {
    id: "eventWeekend",
    name: "周末活动",
    desc: "临时活动用模板，提高掉落、经验、陨石空投频率和牧场伙伴赠礼上限。",
    tags: ["活动", "掉落", "周末"],
    values: {
      ExpRate: "3.000000",
      PalCaptureRate: "1.500000",
      CollectionDropRate: "2.500000",
      EnemyDropItemRate: "2.500000",
      SupplyDropSpan: "60",
      bActiveUNKO: "True",
      DropItemMaxNum_UNKO: "300",
      PalEggDefaultHatchingTime: "1.000000",
      WorkSpeedRate: "2.000000",
      DeathPenalty: "None"
    }
  }
];
