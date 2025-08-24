// 成员渲染类
// 确保utils可用
const utils = window.utils || {
    safeQuerySelector: (selector) => {
        try {
            return document.querySelector(selector) || null;
        } catch (error) {
            console.error(`查询选择器失败: ${selector}`, error);
            return null;
        }
    },
    safeQuerySelectorAll: (selector) => {
        try {
            return document.querySelectorAll(selector) || [];
        } catch (error) {
            console.error(`查询多元素选择器失败: ${selector}`, error);
            return [];
        }
    }
};

export class MembersRenderer {
    constructor() {
        this.membersGrid = utils.safeQuerySelector('#members-grid');
        this.regularMembersContainer = null;
        this.init();
    }
    
    init() {
        if (this.membersGrid && window.CLAN_CONFIG && window.CLAN_CONFIG.members) {
            this.renderMembers();
        } else {
            console.warn('成员配置未找到，无法渲染成员卡片');
        }
    }
    
    renderMembers() {
        const { leaders, coLeaders, elders, members } = window.CLAN_CONFIG.members;
        
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
        this.filterButtons = utils.safeQuerySelectorAll('.inline-flex button[type="button"]');
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
        });
    }
    
    handleFilterClick(index) {
        const filters = ['all', 'leader', 'coLeader', 'elder', 'member'];
        this.currentFilter = filters[index];
        this.updateButtonStates();
        this.filterMembers();
    }
    
    updateButtonStates() {
        this.filterButtons.forEach((button, index) => {
            const filters = ['all', 'leader', 'coLeader', 'elder', 'member'];
            if (filters[index] === this.currentFilter) {
                button.classList.add('bg-blue-600', 'text-white');
                button.classList.remove('bg-gray-700', 'text-gray-300');
            } else {
                button.classList.add('bg-gray-700', 'text-gray-300');
                button.classList.remove('bg-blue-600', 'text-white');
            }
        });
    }
    
    filterMembers() {
        if (!this.membersRenderer) {
            console.warn('成员渲染器未设置');
            return;
        }
        
        this.membersRenderer.renderMembers();
        this.renderFilteredMembers();
    }
    
    renderFilteredMembers() {
        const memberCards = utils.safeQuerySelectorAll('.member-card');
        
        memberCards.forEach(card => {
            const roleElement = card.querySelector('[class*="text-"]');
            if (roleElement) {
                const roleText = roleElement.textContent.trim();
                const role = this.getRoleFromText(roleText);
                
                if (this.currentFilter === 'all' || role === this.currentFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    getRoleFromText(roleText) {
        const roleMap = {
            '首领': 'leader',
            '副首领': 'coLeader',
            '长老': 'elder',
            '成员': 'member'
        };
        
        return roleMap[roleText] || 'member';
    }
}