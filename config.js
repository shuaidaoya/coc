// 部落冲突文苑阁部落配置文件
// 
// 功能说明：
// 1. 部落基本信息配置 - 包含部落名称、标签、等级、成员数量等
// 2. 部落规则配置 - 定义部落内部规则和制度
// 3. 部落公告配置 - 重要公告和通知信息
// 4. 特别提醒配置 - 游戏相关的特殊注意事项
// 5. 部落成员数据配置 - 包含首领、副首领、长老和普通成员的详细信息
// 6. 游戏资料配置 - 游戏特色、兵种、英雄、游戏模式介绍
// 7. 加入要求配置 - 新成员加入部落的条件
// 8. 部落优势配置 - 展示部落的独特优势
// 9. 联系方式配置 - 各种联系渠道信息
// 10. 网站配置 - 网站的基本信息和版本信息
//
// 成员展示说明：
// - 首领、副首领、长老默认显示在页面中
// - 普通成员默认折叠隐藏，点击"查看更多成员"按钮可展开/折叠
// - 折叠功能通过HTML中的MembersToggle类实现，支持键盘导航和无障碍访问
//
const CLAN_CONFIG = {
    // 部落基本信息
    clan: {
        name: "文苑阁",
        // 部落标签
        tag: "#2QYYOV89C",
        // 部落等级
        level: 8,
        // 成员数量
        members: {
            current: 17,
            max: 50
        },
        // 部落联赛积分
        leaguePoints: 22085,
        // 部落战奖杯要求
        requiredTrophies: 1600,
        // 部落战大本营要求
        requiredTownHall: 12,
        // 部落荣誉
        honor: 5777856,
        // 部落描述
        description: "文苑阁是一个活跃的部落，我们致力于打造一个友好、互助的游戏环境，欢迎各路玩家加入我们的大家庭！"
    },

    // 部落规则
    rules: [
        "积极参与部落战和部落竞赛",
        "保持活跃，拒绝躺平",
        "尊重其他成员，禁止恶意行为",
        "首领和副首领的决定为最终决定",
        "有任何问题可以联系首领和副首领",
        "禁止使用任何形式的广告、刷屏等行为"
    ],

    // 部落公告
    announcements: [
        "文能提笔安天下，武能开图定乾坤",
        "部落招募活跃玩家，内置双奶，拒绝躺平",
        "部落战连开、都城共建，联赛全力冲榜"
    ],

    // 特别提醒
    specialNotes: [
        "每日奶号捐兵时间4：00-3：00",
        "不支持法术：复苏",
        "攻城机器目前仅支持前三个",
        "部落战优先打对位，打完打上一位或下一位",
        "奶号由魔神提供，有任何问题可以联系魔神"
    ],

    // 部落成员数据
    // 
    // 成员分类说明：
    // - leaders: 首领 - 部落最高管理者，拥有所有权限
    // - coLeaders: 副首领 - 协助首领管理部落，拥有大部分管理权限
    // - elders: 长老 - 部落资深成员，拥有部分管理权限
    // - members: 普通成员 - 部落基础成员，参与部落活动
    //
    // 成员展示逻辑：
    // - 首领、副首领、长老默认在页面中显示
    // - 普通成员默认折叠隐藏，通过"查看更多成员"按钮控制显示/隐藏
    // - 每个成员包含：姓名、角色、当前奖杯、历史最佳、大本营等级、加入时间、头像、颜色等信息
    //
    members: {
        // 首领列表 - 默认显示
        leaders: [
            {
                name: "绝战到底",
                // 职位
                role: "首领",
                // 当前奖杯
                currentTrophies: 4943,
                // 历史最佳奖杯
                bestTrophies: 5359,
                // 大本营等级
                townHall: 16,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "W",
                // 颜色
                color: "blue"
            }
        ],
        // 副首领列表 - 默认显示
        coLeaders: [
            {
                name: "魔神",
                // 职位
                role: "副首领",
                // 当前奖杯
                currentTrophies: 4836,
                // 历史最佳奖杯
                bestTrophies: 5005,
                // 大本营等级
                townHall: 16,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "S",
                // 颜色
                color: "purple"
            },
            {
                name: "天朝",
                // 职位
                role: "副首领",
                // 当前奖杯
                currentTrophies: 3033,
                // 历史最佳奖杯
                bestTrophies: 4296,
                // 大本营等级
                townHall: 15,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "S",
                // 颜色
                color: "purple"
            }
        ],
        // 长老列表 - 默认显示
        elders: [
            {
                name: "采野果",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 4243,
                // 历史最佳奖杯
                bestTrophies: 5094,
                // 大本营等级
                townHall: 17,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "Y",
                // 颜色
                color: "green"
            },
            {
                name: "小卤蛋",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 3926,
                // 历史最佳奖杯
                bestTrophies: 5371,
                // 大本营等级
                townHall: 16,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "Y",
                // 颜色
                color: "green"
            },
            {
                name: "心在痛める",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 3654,
                // 历史最佳奖杯
                bestTrophies: 3708,
                // 大本营等级
                townHall: 14,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "Y",
                // 颜色
                color: "green"
            },
            {
                name: "辉辉",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 2781,
                // 历史最佳奖杯
                bestTrophies: 3473,
                // 大本营等级
                townHall: 14,
                joinDate: "部落元老",
                avatar: "Y",
                color: "green"
            },
            {
                name: "天煞魔君",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 3276,
                // 历史最佳奖杯
                bestTrophies: 3305,
                // 大本营等级
                townHall: 14,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "Y",
                // 颜色
                color: "green"
            },
            {
                name: "时道",
                // 职位
                role: "长老",
                // 当前奖杯
                currentTrophies: 3151,
                // 历史最佳奖杯
                bestTrophies: 3151,
                // 大本营等级
                townHall: 14,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "Y",
                // 颜色
                color: "green"
            }
        ],
        // 普通成员列表 - 默认折叠隐藏，通过按钮控制显示
        members: [          
            {
                name: "孤。傲",
                // 职位
                role: "成员",
                // 当前奖杯
                currentTrophies: 2867,
                // 历史最佳奖杯
                bestTrophies: 3222,
                // 大本营等级
                townHall: 15,
                // 加入时间
                joinDate: "2025年1月",
                // 头像
                avatar: "H",  
                // 颜色
                color: "gray"
            },          
            {
                name: "龙踏天下",
                // 职位
                role: "成员",
                // 当前奖杯
                currentTrophies: 3656,
                // 历史最佳奖杯
                bestTrophies: 3661,
                // 大本营等级
                townHall: 15,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "F",
                // 颜色
                color: "gray"
            },
            {
                name: "XX的村庄",
                // 职位
                role: "成员",
                // 当前奖杯
                currentTrophies: 2245,
                // 历史最佳奖杯
                bestTrophies: 2612,
                // 大本营等级
                townHall: 13,
                // 加入时间
                joinDate: "部落元老",
                // 头像
                avatar: "F",
                // 颜色
                color: "gray"
            },
            {
                name: "永恒",
                // 职位
                role: "成员",
                // 当前奖杯
                currentTrophies: 2377,
                // 历史最佳奖杯
                bestTrophies: 2849,
                // 大本营等级
                townHall: 13,
                // 加入时间
                joinDate: "2025年1月",
                // 头像
                avatar: "X",
                // 颜色
                color: "gray"
            }
        ]
    },

    // 游戏资料
    gameInfo: {
        features: [
            {
                icon: "fas fa-home",
                title: "村庄建设",
                description: "从一个小村庄开始，逐步建设你的防御工事、资源收集器和军队训练营，打造坚不可摧的堡垒。"
            },
            {
                icon: "fas fa-users",
                title: "部落系统",
                description: "加入或创建部落，与盟友一起参与部落战、部落竞赛和友谊战，体验团队合作的乐趣。"
            },
            {
                icon: "fas fa-trophy",
                title: "联赛系统",
                description: "从青铜联赛到泰坦联赛，挑战自我提升排名，争夺更高的荣誉和更丰厚的奖励。"
            },
            {
                icon: "fas fa-shield-alt",
                title: "防御策略",
                description: "学习各种防御布局和陷阱设置，保护你的资源不被掠夺，成为难以攻克的堡垒。"
            }
        ],
        troops: [
            {
                name: "野蛮人",
                image: "/imgs/野蛮人.png",
                description: "近战单位，训练成本低，适合初期使用"
            },
            {
                name: "弓箭手",
                image: "/imgs/弓箭手.png",
                description: "远程单位，可攻击空中和地面目标"
            },
            {
                name: "巨人",
                image: "/imgs/巨人.png",
                description: "高生命值，优先攻击防御建筑"
            },
            {
                name: "气球",
                image: "/imgs/气球.png",
                description: "空中单位，优先攻击防御建筑"
            },
            {
                name: "飞龙",
                image: "/imgs/飞龙.png",
                description: "空中单位，范围伤害，强力但昂贵"
            }
        ],
        heroes: [
            {
                name: "野蛮人之王",
                image: "/imgs/野蛮人之王.png",
                description: "地面近战英雄，技能可召唤野蛮人"
            },
            {
                name: "弓箭女皇",
                image: "/imgs/弓箭女皇.webp",
                description: "远程英雄，可隐身并提升攻击速度"
            },
            {
                name: "大守护者",
                image: "/imgs/大守护者.png",
                description: "可切换地面/空中模式，提供生命光环"
            },
            {
                name: "飞盾战神",
                image: "/imgs/飞盾战神.webp",
                description: "投掷长矛，技能可跳跃城墙"
            },
            {
                name: "亡灵王子",
                image: "/imgs/亡灵王子.webp",
                description: "会在空中发射暗黑粘液，对防御建筑和部队造成伤害"
            }
        ],
        gameModes: [
            {
                icon: "fas fa-flag",
                color: "red",
                title: "单人模式",
                description: "挑战哥布林关卡，获得额外资源和宝石奖励，测试你的进攻策略。"
            },
            {
                icon: "fas fa-users",
                color: "blue",
                title: "部落战",
                description: "与其他部落对抗，通过两次进攻获得胜利，赢得丰厚的战争奖励。"
            },
            {
                icon: "fas fa-trophy",
                color: "yellow",
                title: "部落联赛",
                description: "每月一次的联赛活动，与实力相当的部落竞争，提升联赛等级。"
            },
            {
                icon: "fas fa-medal",
                color: "green",
                title: "部落竞赛",
                description: "完成各种任务获得积分，全部落共同努力解锁丰厚奖励。"
            },
            {
                icon: "fas fa-handshake",
                color: "purple",
                title: "友谊战",
                description: "与部落成员进行练习对战，不消耗兵力，测试新的进攻策略。"
            }
        ]
    },

    // 加入要求
    requirements: [
        "大本营12级及以上",
        "奖杯数1600以上",
        "每周至少参与一次部落战",
        "每周捐兵不少于200",
        "积极参与部落竞赛"
    ],

    // 部落优势
    advantages: [
        {
            icon: "fas fa-trophy",
            color: "blue",
            title: "高胜率部落战",
            description: "我们拥有专业的战术指导团队，部落战胜率保持在85%以上，帮助你快速提升进攻技巧。"
        },
        {
            icon: "fas fa-gift",
            color: "green",
            title: "快速捐兵",
            description: "24小时活跃捐兵，高级兵种秒捐，满足你的各种战术需求，助你轻松三星。"
        },
        {
            icon: "fas fa-medal",
            color: "yellow",
            title: "部落竞赛满分",
            description: "每期部落竞赛必满，全员参与，确保每位成员都能获得最高奖励。"
        },
        {
            icon: "fas fa-users",
            color: "purple",
            title: "友好社区",
            description: "我们注重团队氛围，定期组织友谊战教学和战术讨论，新手也能快速成长。"
        },
        {
            icon: "fas fa-calendar-alt",
            color: "red",
            title: "定期活动",
            description: "每月参加部落对战联赛，优胜者将获得额外奖章奖励，还有机会晋升为部落管理。"
        }
    ],

    // 联系方式
    contact: {
        clanTag: "#2QYYOV89C",
        discord: "暂无",
        qqGroup: "暂无",
        email: "shuaidaoya@gmail.com",
        socialMedia: {
            facebook: "#",
            twitter: "#",
            youtube: "#",
            instagram: "#"
        }
    },

    // 网站配置
    website: {
        title: "部落冲突 - 文苑阁",
        description: "部落冲突文苑阁部落官方网站 - 加入我们，体验最激烈的部落战争！",
        keywords: "部落冲突,文苑阁,部落,Clash of Clans,游戏",
        author: "文苑阁部落",
        version: "2.0.0",
        lastUpdated: "2025-01-27"
    }
};

// 导出配置（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CLAN_CONFIG;
}

// 全局访问（如果直接引入）
if (typeof window !== 'undefined') {
    window.CLAN_CONFIG = CLAN_CONFIG;
}

