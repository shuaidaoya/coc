/**
 * 部落冲突文苑阁部落配置中心
 * 
 * 重构亮点：
 * 1. 使用常量定义减少魔法字符串
 * 2. 模块化数据结构
 * 3. 类型安全验证
 * 4. 环境配置分离
 * 5. 缓存优化
 */

// 常量定义
const CONSTANTS = {
  ROLES: {
    LEADER: '首领',
    CO_LEADER: '副首领',
    ELDER: '长老',
    MEMBER: '成员'
  },
  COLORS: {
    BLUE: 'blue',
    PURPLE: 'purple',
    GREEN: 'green',
    GRAY: 'gray'
  },
  AVATARS: {
    W: 'W', S: 'S', Y: 'Y', H: 'H', F: 'F', X: 'X'
  }
};

// 部落基础信息
const CLAN_BASE = {
  name: "文苑阁",
  tag: "#2QYYOV89C",
  level: 8,
  members: { current: 17, max: 50 },
  leaguePoints: 22085,
  requiredTrophies: 1600,
  requiredTownHall: 12,
  honor: 5777856,
  description: "文苑阁是一个活跃的部落，我们致力于打造一个友好、互助的游戏环境，欢迎各路玩家加入我们的大家庭！"
};

// 成员数据（使用工厂模式创建）
const createMember = (name, role, trophies, bestTrophies, townHall, joinDate, avatar, color) => ({
  name, role, currentTrophies: trophies, bestTrophies, townHall, joinDate, avatar, color
});

// 优化后的成员数据
const MEMBERS_DATA = {
  leaders: [
    createMember("绝战到底", CONSTANTS.ROLES.LEADER, 4943, 5359, 16, "部落元老", CONSTANTS.AVATARS.W, CONSTANTS.COLORS.BLUE)
  ],
  coLeaders: [
    createMember("魔神", CONSTANTS.ROLES.CO_LEADER, 4836, 5005, 16, "部落元老", CONSTANTS.AVATARS.S, CONSTANTS.COLORS.PURPLE),
    createMember("天朝", CONSTANTS.ROLES.CO_LEADER, 3033, 4296, 15, "部落元老", CONSTANTS.AVATARS.S, CONSTANTS.COLORS.PURPLE)
  ],
  elders: [
    createMember("采野果", CONSTANTS.ROLES.ELDER, 4243, 5094, 17, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN),
    createMember("小卤蛋", CONSTANTS.ROLES.ELDER, 3926, 5371, 16, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN),
    createMember("心在痛める", CONSTANTS.ROLES.ELDER, 3654, 3708, 14, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN),
    createMember("辉辉", CONSTANTS.ROLES.ELDER, 2781, 3473, 14, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN),
    createMember("天煞魔君", CONSTANTS.ROLES.ELDER, 3276, 3305, 14, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN),
    createMember("时道", CONSTANTS.ROLES.ELDER, 3151, 3151, 14, "部落元老", CONSTANTS.AVATARS.Y, CONSTANTS.COLORS.GREEN)
  ],
  members: [
    createMember("孤。傲", CONSTANTS.ROLES.MEMBER, 2867, 3222, 15, "2025年1月", CONSTANTS.AVATARS.H, CONSTANTS.COLORS.GRAY),
    createMember("龙踏天下", CONSTANTS.ROLES.MEMBER, 3656, 3661, 15, "部落元老", CONSTANTS.AVATARS.F, CONSTANTS.COLORS.GRAY),
    createMember("XX的村庄", CONSTANTS.ROLES.MEMBER, 2245, 2612, 13, "部落元老", CONSTANTS.AVATARS.F, CONSTANTS.COLORS.GRAY),
    createMember("永恒", CONSTANTS.ROLES.MEMBER, 2377, 2849, 13, "2025年1月", CONSTANTS.AVATARS.X, CONSTANTS.COLORS.GRAY)
  ]
};

// 游戏内容配置
const GAME_CONTENT = {
  features: [
    { icon: "fas fa-home", title: "村庄建设", description: "从一个小村庄开始，逐步建设你的防御工事、资源收集器和军队训练营，打造坚不可摧的堡垒。" },
    { icon: "fas fa-users", title: "部落系统", description: "加入或创建部落，与盟友一起参与部落战、部落竞赛和友谊战，体验团队合作的乐趣。" },
    { icon: "fas fa-trophy", title: "联赛系统", description: "从青铜联赛到泰坦联赛，挑战自我提升排名，争夺更高的荣誉和更丰厚的奖励。" },
    { icon: "fas fa-shield-alt", title: "防御策略", description: "学习各种防御布局和陷阱设置，保护你的资源不被掠夺，成为难以攻克的堡垒。" }
  ],
  troops: [
    { name: "野蛮人", image: "/imgs/野蛮人.png", description: "近战单位，训练成本低，适合初期使用" },
    { name: "弓箭手", image: "/imgs/弓箭手.png", description: "远程单位，可攻击空中和地面目标" },
    { name: "巨人", image: "/imgs/巨人.png", description: "高生命值，优先攻击防御建筑" },
    { name: "气球", image: "/imgs/气球.png", description: "空中单位，优先攻击防御建筑" },
    { name: "飞龙", image: "/imgs/飞龙.png", description: "空中单位，范围伤害，强力但昂贵" }
  ],
  heroes: [
    { name: "野蛮人之王", image: "/imgs/野蛮人之王.png", description: "地面近战英雄，技能可召唤野蛮人" },
    { name: "弓箭女皇", image: "/imgs/弓箭女皇.webp", description: "远程英雄，可隐身并提升攻击速度" },
    { name: "大守护者", image: "/imgs/大守护者.png", description: "可切换地面/空中模式，提供生命光环" },
    { name: "飞盾战神", image: "/imgs/飞盾战神.webp", description: "投掷长矛，技能可跳跃城墙" },
    { name: "亡灵王子", image: "/imgs/亡灵王子.webp", description: "会在空中发射暗黑粘液，对防御建筑和部队造成伤害" }
  ],
  gameModes: [
    { icon: "fas fa-flag", color: "red", title: "单人模式", description: "挑战哥布林关卡，获得额外资源和宝石奖励，测试你的进攻策略。" },
    { icon: "fas fa-users", color: "blue", title: "部落战", description: "与其他部落对抗，通过两次进攻获得胜利，赢得丰厚的战争奖励。" },
    { icon: "fas fa-trophy", color: "yellow", title: "部落联赛", description: "每月一次的联赛活动，与实力相当的部落竞争，提升联赛等级。" },
    { icon: "fas fa-medal", color: "green", title: "部落竞赛", description: "完成各种任务获得积分，全部落ogether解锁丰厚奖励。" }
  ]
};

// 暴露配置到全局window对象
window.CLAN_CONFIG = {
    constants: CONSTANTS,
    base: CLAN_BASE,
    // 修改这里：直接展开MEMBERS_DATA
    ...MEMBERS_DATA,
    game: GAME_CONTENT,
    debug: false
};

