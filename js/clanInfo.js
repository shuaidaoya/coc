// 部落信息更新类
export class ClanInfoUpdater {
    constructor() {
        this.init();
    }
    
    init() {
        if (window.CLAN_CONFIG && window.CLAN_CONFIG.clan) {
            this.updateClanInfo();
            this.updateContactInfo();
            this.updateWebsiteInfo();
            this.updateRulesAndAnnouncements();
            this.updateRequirementsAndAdvantages();
        } else {
            console.warn('部落配置未找到，无法更新部落信息');
        }
    }
    
    updateClan极速赛车微信群Info() {
        const clan = window.CLAN_CONFIG.clan;
        
        // 更新部落等级
        this.updateElement('部落等级', clan.level);
        
        // 更新成员数量
        this.updateElement('成员', `${clan.members.current}/${clan.members.max}`);
        
        // 更新联赛积分
        this.updateElement('金杯联赛积分', clan.leaguePoints);
        
        // 更新荣誉度
        this.updateElement('荣誉度', clan.honor);
        
        // 更新所需奖杯和大本营等级（如果有的话）
        if (clan.requiredTrophies) {
            this.updateElement('所需奖杯', clan.requiredTrophies);
        }
        if (clan.requiredTownHall) {
            this.updateElement('所需大本营等级', clan.requiredTownHall);
        }
    }
    
    updateContactInfo() {
        const contact = window.CLAN_CONFIG.contact;
        
        // 更新部落标签
        this.updateElement('部落标签:', contact.clanTag);
        
        // 更新Discord
        this.updateElement('Discord:', contact.discord);
        
        // 更新QQ群
        this.updateElement('QQ群:', contact.qqGroup);
        
        // 更新邮箱
        this.updateElement('Email:', contact.email);
        
        // 更新页脚中的联系信息
        this.updateFooterContact(contact);
    }
    
    updateFooterContact(contact) {
        // 更新页脚部落标签
        const footerClanTag = document.getElementById('footer-clan-tag');
        if (footerClanTag) {
            footerClanTag.textContent = `部落标签: ${contact.clanTag}`;
        }
        
        // 更新页脚Discord
        const footerDiscord = document.getElementById('footer-discord');
        if (footerDiscord) {
            footerDiscord.textContent = `Discord: ${contact.discord}`;}
        
        // 更新页脚QQ群
        const footerQQ = document.getElementById('footer-qq');
        if (footerQQ) {
            footerQQ.textContent = `QQ群: ${contact.qqGroup}`;
        }
        
        // 更新页脚邮箱
        const footerEmail = document.getElementById('footer-email');
        if (footerEmail) {
            footerEmail.textContent = `Email: ${contact.email}`;
        }
        
        // 更新社交媒体链接
        if (contact.socialMedia) {
            const footerFacebook = document.getElementById('footer-facebook');
            if (footerFacebook && contact.socialMedia.facebook !== '#') {
                footerFacebook.href = contact.socialMedia.facebook;
            }
            
            const footerTwitter = document.getElementById('footer-twitter');
            if (footerTwitter && contact.socialMedia.twitter !== '#') {
                footerTwitter.href = contact.socialMedia.twitter;
            }
            
            const footerYoutube = document.getElementById('footer-youtube');
            if (footerYoutube && contact.socialMedia.youtube !== '#') {
                footerYoutube.href = contact.socialMedia.youtube;
            }
            
            const footerInstagram = document.getElementById('footer-instagram');
            if (footerInstagram && contact.socialMedia.instagram !== '#') {
                footerInstagram.href = contact.socialMedia.instagram;
            }}
    }
    
    updateWebsiteInfo() {
        const website = window.CLAN_CONFIG.website;
        
        // 更新页面标题
        if (document.title !== website.title) {
            document.title = website.title;
        }
        
        // 更新meta描述
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && metaDescription.content !== website.description) {
            metaDescription.content = website.description;
        }
        
        // 更新meta关键词
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && metaKeywords.content !== website.keywords) {
            metaKeywords.content = website.keywords;
        }
        
        // 更新meta作者
        const metaAuthor = document.querySelector('meta[name="author"]');
        if (metaAuthor && metaAuthor.content !== website.author) {
            metaAuthor.content = website.author;
        }
        
        // 更新页脚版权信息
        this.updateFooterCopyright(website);
    }
    
    updateFooterCopyright(website) {
        const currentYear = new Date().getFullYear();
        
        // 更新版权信息极速赛车微信群        const footerCopyright = document.getElementById('footer-copyright');
        if (footerCopyright) {
            footerCopyright.textContent = `&copy; ${currentYear} ${website.author}. 保留所有权利.`;
        }
        
        // 更新免责声明（如果需要的话）
        const footerDisclaimer = document.getElementById('footer-disclaimer');
        if (footerDisclaimer) {
            footerDisclaimer.textContent = '部落冲突是Supercell的注册商标，本网站为粉丝制作，与Supercell无关。';
        }
    }
    
    updateRulesAndAnnouncements() {
        const config = window.CLAN_CONFIG;
        
        // 更新部落规则
        if (config.rules && config.rules.length > 0) {
            this.updateList('部落规则', config.rules);
        }
        
        // 更新部落公告
        if (config.announcements && config.announcements.length > 0) {
            this.updateAnnouncements(config.announcements);
        }
        
        // 更新特别提醒
        if (config.specialNotes && config.specialNotes.length > 0) {
            this.updateList('特别提醒', config.specialNotes);
        }
    }
    
    updateRequirementsAndAdvantages() {
        const config = window.CLAN_CONFIG;

        // 更新加入要求
        if (config.requirements && config.requirements.length > 0) {
            this.updateRequirements(config.requirements);}
        
        // 更新部落优势
        if (config.advantages && config.advantages.length > 0) {
            this.updateAdvantages(config.advantages);
        }
    }
    
    updateList(sectionName, items) {
        // 查找包含sectionName的section
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            if (heading && heading.textContent.includes(sectionName)) {
                const list = section.querySelector('ul');
                if (list) {
                    list.innerHTML = '';
                    items.forEach((item, index) => {
                        const li = document.createElement('li');
                        if (sectionName === '部落规则') {
                            li.textContent = `${index + 1}. ${item}`;
                        } else {
                            li.textContent = item;
                        }
                        list.appendChild(li);
                    });
                }
            }
        });
    }
    
    updateAnnouncements(announcements) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            if (heading && heading.textContent.includes('部落公告')) {
                const container = section.querySelector('.text-gray-300');
                if (container) {
                    container.innerHTML = '';
                    announcements.forEach(announcement => {
                        const p = document.createElement('p');
                        p.textContent = announcement;
                        container.appendChild(p);
                    });
                }
            }
        });
    }
    
    updateRequirements(requirements) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            if (heading && heading.textContent.includes('加入要求')) {
                const list = section.querySelector('ul');
                if (list) {
                    list.innerHTML = '';
                    requirements.forEach(requirement => {
                        const li = document.createElement('li');
                        li.className = 'flex items-start';
                        li.innerHTML = `
                            <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                            <span>${requirement}</span>
                        `;
                        list.appendChild(li);
                    });
                }
            }
        });
    }
    
    updateAdvantages(advantages) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            if (heading && heading.textContent.includes('为什么选择文苑阁')) {
                const container = section.querySelector('.space-y-6');                
                if (container) {
                    container.innerHTML = '';
                    advantages.forEach(advantage => {
                        const div = document.createElement('div');
                        div.className = 'flex';
                        div.innerHTML = `
                            <div class="flex-shrink-0">
                                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-${advantage.color}-900 text-${advantage.color}-400">
                                    <i class="${advantage.icon}"></i>
                                </div>
                            </div>
                            <div class="ml-4">
                                <h4 class="text-lg font-bold text-white">${advantage.title}</h4>
                                <p class="mt-1 text-gray-300">${advantage.description}</p>
                            </div>
                        `;
                        container.appendChild(div);
                    });
                }
            }
        });
    }
    
    updateElement(label, value) {
        const elements = document.querySelectorAll('span');
        elements.forEach(element => {
            if (element.textContent.includes(label)) {
                const strongElement = element.querySelector('strong');
                if (strongElement) {
                    strongElement.textContent = value;
                } else {
                    // 如果没有strong标签，直接更新span的内容
                    element.textContent = element.textContent.replace(label, `${label} ${value}`);
                }
            }
        });
    }
}