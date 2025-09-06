// 成员渲染类
// 移除错误的utils定义，改为正确导入
import { utils } from './utils.js';

// 添加一个等待配置加载的函数
const waitForClanConfig = () => {
    return new Promise((resolve) => {
        if (window.CLAN_CONFIG) {
            resolve(window.CLAN_CONFIG);
        } else {
            const checkConfig = () => {
                if (window.CLAN_CONFIG) {
                    resolve(window.CLAN_CONFIG);
                } else {
                    setTimeout(checkConfig, 100);
                }
            };
            checkConfig();
        }
    });
};

export class MembersRenderer {
    constructor() {
        this.membersGrid = utils.safeQuerySelector('#members-grid');
        this.regularMembersContainer = null;
        this.init();
    }
    
    async init() {
        if (this.membersGrid) {
            try {
                // 等待配置加载完成
                await waitForClanConfig();
                
                if (window.CLAN_CONFIG && window.CLAN_CONFIG.members) {
                    this.renderMembers();
                } else {
                    console.warn('成员配置未找到，无法渲染成员卡片');
                    // 即使没有配置，也尝试使用模拟数据渲染
                    this.renderMembersWithMockData();
                }
            } catch (error) {
                console.error('初始化成员渲染器失败:', error);
                this.renderMembersWithMockData();
            }
        }
    }
    
    renderMembers() {
        // 修改为直接访问顶层属性
        const { leaders, coLeaders, elders, members } = window.CLAN_CONFIG;
        
        // 清空现有内容
        this.membersGrid.innerHTML = '';
        
        // 渲染首领
        leaders.forEach(leader => this.renderMemberCard(leader, 'leader'));
        
        // 渲染副首领
        coLeaders.forEach(coLeader => this.renderMemberCard(coLeader, 'coLeader'));
        
        // 渲染长老
        elders.forEach(elder => this.renderMemberCard(elder, 'elder'));
        
        // 创建普通成员容器
        this.createRegularMembersContainer(members);
    }
    
    renderMembersWithMockData() {
        // 创建一些模拟数据以便在没有配置时也能显示效果
        const mockData = {
            leaders: [{ name: '测试首领', currentTrophies: 5000, bestTrophies: 5500, townHall: 16, joinDate: '2024' }],
            coLeaders: [{ name: '测试副首领', currentTrophies: 4800, bestTrophies: 5200, townHall: 15, joinDate: '2024' }],
            elders: [{ name: '测试长老', currentTrophies: 4500, bestTrophies: 5000, townHall: 14, joinDate: '2024' }],
            members: [{ name: '测试成员', currentTrophies: 4000, bestTrophies: 4500, townHall: 13, joinDate: '2024' }]
        };
        
        // 清空现有内容
        this.membersGrid.innerHTML = '';
        
        // 使用模拟数据渲染
        mockData.leaders.forEach(leader => this.renderMemberCard(leader, 'leader'));
        mockData.coLeaders.forEach(coLeader => this.renderMemberCard(coLeader, 'coLeader'));
        mockData.elders.forEach(elder => this.renderMemberCard(elder, 'elder'));
        this.createRegularMembersContainer(mockData.members);
    }
    
    renderMemberCard(member, role) {
        const card = document.createElement('div');
        card.className = 'member-card rounded-lg overflow-hidden border border-gray-700';
        
        const roleConfig = this.getRoleConfig(role);
        
        card.innerHTML = `
            <div class="${roleConfig.bgClass} p-4 flex items-center">
                <div class="w-16 h-16 rounded-full ${roleConfig.colorClass} flex items-center justify-center text-2xl font-bold text-white">
                    ${this.getInitial(member.name)}
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-bold text-white">${member.name}</h3>
                    <div class="flex items-center ${roleConfig.textClass} text-sm">
                        <i class="${roleConfig.icon} mr-1"></i>
                        <span>${roleConfig.label}</span>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between mb-2">
                    <span class="text-gray-400">目前奖杯:</span>
                    <span class="text-white font-medium">${member.currentTrophies}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-400">历史最佳:</span>
                    <span class="text-white font-medium">${member.bestTrophies}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-400">大本营等级</span>
                    <span class="text-white font-medium">${member.townHall}</span>
                </div>
                 <div class="flex justify-between">
                    <span class="text-gray-400">加入:</span>
                    <span class="text-white font-medium">${member.joinDate}</span>
                </div>
            </div>
        `;
        
        this.membersGrid.appendChild(card);
    }
    
    createRegularMembersContainer(members) {
        // 创建普通成员容器
        this.regularMembersContainer = document.createElement('div');
        this.regularMembersContainer.id = 'regular-members-container';
        this.regularMembersContainer.className = 'hidden col-span-full';
        
        const innerGrid = document.createElement('div');
        innerGrid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
        
        // 渲染普通成员
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card rounded-lg overflow-hidden border border-gray-700';
            
            card.innerHTML = `
                <div class="bg-gray-800 p-4 flex items-center">
                    <div class="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2xl font-bold text-white">
                        ${this.getInitial(member.name)}
                    </div>
                    <div class="ml-4">
                        <h3 class="text-lg font-bold text-white">${member.name}</h3>
                        <div class="flex items-center text-gray-400 text-sm">
                            <i class="fas fa-user mr-1"></i>
                            <span>成员</span>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-400">目前奖杯:</span>
                        <span class="text-white font-medium">${member.currentTrophies}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-400">历史最佳:</span>
                        <span class="text-white font-medium">${member.bestTrophies}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span class="text-gray-400">大本营等级</span>
                        <span class="text-white font-medium">${member.townHall}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">加入:</span>
                        <span class="text-white font-medium">${member.joinDate}</span>
                    </div>
                </div>
            `;
            
            innerGrid.appendChild(card);
        });
        
        this.regularMembersContainer.appendChild(innerGrid);
        this.membersGrid.appendChild(this.regularMembersContainer);
    }
    
    getRoleConfig(role) {
        const configs = {
            leader: {
                bgClass: 'bg-blue-900/50',
                colorClass: 'bg-blue-600',
                textClass: 'text-yellow-400',
                icon: 'fas fa-crown',
                label: '首领'
            },
            coLeader: {
                bgClass: 'bg-purple-900/50',
                colorClass: 'bg-purple-600',
                textClass: 'text-purple-400',
                icon: 'fas fa-star',
                label: '副首领'
            },
            elder: {
                bgClass: 'bg-green-900/50',
                colorClass: 'bg-green-600',
                textClass: 'text-green-400',
                icon: 'fas fa-award',
                label: '长老'
            },
            member: {
                bgClass: 'bg-gray-900/50',
                colorClass: 'bg-gray-600',
                textClass: 'text-gray-400', 
                icon: 'fas fa-user',
                label: '成员'
            }
        };
        
        return configs[role] || configs.member;
    }
    
    getInitial(name) {
        return name.charAt(0).toUpperCase();
    }
}

// 成员折叠管理类
export class MembersToggle {
    constructor() {
        this.toggleButton = utils.safeQuerySelector('#toggle-members-btn');
        this.regularMembersContainer = null;
        this.isExpanded = false;
        
        if (this.toggleButton) {
            this.init();
        }
    }
    
    setRegularMembersContainer(container) {
        this.regularMembersContainer = container;
    }
    
    init() {
        this.toggleButton.addEventListener('click', () => this.toggleMembers());
        this.toggleButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMembers();
            }
        });
    }
    
    toggleMembers() {
        if (!this.regularMembersContainer) {
            console.warn('普通成员容器未找到');
            return;
        }
        
        this.isExpanded = !this.isExpanded;
        this.updateUI();
        this.updateAccessibility();
    }
    
    updateUI() {
        if (this.isExpanded) {
            // 展开普通成员
            this.regularMembersContainer.classList.remove('hidden');
            this.toggleButton.innerHTML = '收起成员 <i class="fas fa-chevron-up ml-2"></i>';
            this.toggleButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            this.toggleButton.classList.add('bg-gray-600', 'hover:bg-gray-700');
        } else {
            // 折叠普通成员
            this.regularMembersContainer.classList.add('hidden');
            this.toggleButton.innerHTML = '查看更多成员 <i class="fas fa-chevron-down ml-2"></i>';
            this.toggleButton.classList.remove('bg-gray-600', 'hover:bg-gray-700');
            this.toggleButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
        
    }
    
    updateAccessibility() {
        if (this.isExpanded) {
            this.toggleButton.setAttribute('aria-expanded', 'true');
            this.toggleButton.setAttribute('aria-label', '收起普通成员列表');
            this.regularMembersContainer.setAttribute('aria-hidden', 'false');
        } else {this.toggleButton.setAttribute('aria-expanded', 'false');
            this.toggleButton.setAttribute('aria-label', '展开普通成员列表');
            this.regularMembersContainer.setAttribute('aria-hidden', 'true');
        }
    }
}

// 成员分类过滤类
export class MembersFilter {
    constructor() {
        // 修改选择器为更精确的匹配
        this.filterButtons = utils.safeQuerySelectorAll('.flex.justify-center.mb-10 .inline-flex button[type="button"]');
        this.membersRenderer = null;
        this.currentFilter = 'all';
        
        if (this.filterButtons.length > 0) {
            this.init();
        }
    }
    
    setMembersRenderer(renderer) {
        this.membersRenderer = renderer;
    }
    
    init() {
        this.filterButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.handleFilterClick(index));
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFilterClick(index);
                }
            });
        });
    }
    
    handleFilterClick(index) {
        const filters = ['all', 'leaders', 'elders', 'members'];
        const filter = filters[index];
        
        if (filter === this.currentFilter) return;
        
        this.currentFilter = filter;
        this.updateButtonStates(index);
        this.filterMembers(filter);
    }
    
    updateButtonStates(activeIndex) {
        this.filterButtons.forEach((button, index) => {
            if (index === activeIndex) {
                button.classList.remove('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600');
                button.classList.add('bg-blue-600', 'text-white');
            } else {
                button.classList.remove('bg-blue-600', 'text-white');
                button.classList.add('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600');
            }
        });
    }
    
    filterMembers(filter) {
        if (!this.membersRenderer) {
            console.warn('成员渲染器未设置');
            return;
        }
        
        // 修改为直接访问顶层属性
        const { leaders, coLeaders, elders, members } = window.CLAN_CONFIG;
        
        switch (filter) {
            case 'all':
                this.membersRenderer.renderMembers();
                break;
            case 'leaders':
                this.renderFilteredMembers([...leaders, ...coLeaders], '首领 & 副首领');
                break;
            case 'elders':
                this.renderFilteredMembers(elders, '长老');
                break;
            case 'members':
                this.renderFilteredMembers(members, '普通成员');
                break;
        }
    }
    
    // 在renderFilteredMembers方法中（约第386行）
    renderFilteredMembers(memberList, title) {
        const membersGrid = document.getElementById('members-grid');
        if (!membersGrid) return;
    
        membersGrid.innerHTML = '';
    
        if (memberList.length === 0) {
            membersGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-users text-gray-500 text-4xl mb-4"></i>
                    <p class="text-gray-400 text-lg">暂无${title}</p>
                </div>
            `;
            return;
        }
    
        memberList.forEach(member => {
            let role = 'member';
            
            // 修改前：
            // const { leaders, coLeaders, elders } = window.CLAN_CONFIG.members;
            
            // 修改后：直接访问顶层属性
            const { leaders, coLeaders, elders } = window.CLAN_CONFIG;
            
            // 仅使用成员名称来识别角色
            const isLeader = leaders.some(leader => leader.name === member.name);
            const isCoLeader = coLeaders.some(coLeader => coLeader.name === member.name);
            const isElder = elders.some(elder => elder.name === member.name);
            
            if (isLeader) role = 'leader';
            else if (isCoLeader) role = 'coLeader';
            else if (isElder) role = 'elder';
            
            this.membersRenderer.renderMemberCard(member, role);
        });
    }
}