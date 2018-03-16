(function (abp) {

    abp.multiTenancy = abp.multiTenancy || {};
    abp.multiTenancy.isEnabled = false;

})(abp);

(function () {

    abp.session = abp.session || {};
    abp.session.userId = null;
    abp.session.tenantId = 1;
    abp.session.impersonatorUserId = null;
    abp.session.impersonatorTenantId = 1;
    abp.session.multiTenancySide = 1;

})();

(function () {

    abp.localization = abp.localization || {};

    abp.localization.currentCulture = {
        name: 'zh-CN',
        displayName: '中文(简体，中国)'
    };

    abp.localization.languages = [{
        name: 'en',
        displayName: 'English',
        icon: 'famfamfam-flag-gb',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'es',
        displayName: 'Español',
        icon: 'famfamfam-flag-es',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'fr',
        displayName: 'Français',
        icon: 'famfamfam-flag-fr',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'de',
        displayName: 'German',
        icon: 'famfamfam-flag-de',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'it',
        displayName: 'Italiano',
        icon: 'famfamfam-flag-it',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'pt-BR',
        displayName: 'Portuguese',
        icon: 'famfamfam-flag-br',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'tr',
        displayName: 'Türkçe',
        icon: 'famfamfam-flag-tr',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'ru',
        displayName: 'Русский',
        icon: 'famfamfam-flag-ru',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'ar',
        displayName: 'العربية',
        icon: 'famfamfam-flag-sa',
        isDisabled: true,
        isDefault: false
    }, {
        name: 'zh-CN',
        displayName: '简体中文',
        icon: 'famfamfam-flag-cn',
        isDisabled: false,
        isDefault: true
    }];

    abp.localization.currentLanguage = {
        name: 'zh-CN',
        displayName: '简体中文',
        icon: 'famfamfam-flag-cn',
        isDisabled: false,
        isDefault: true
    };

    abp.localization.sources = [
        {
            name: 'Abp',
            type: 'MultiTenantLocalizationSource'
        },
        {
            name: 'AbpWeb',
            type: 'MultiTenantLocalizationSource'
        },
        {
            name: 'AbpZero',
            type: 'MultiTenantLocalizationSource'
        },
        {
            name: 'AbpZeroTemplate',
            type: 'MultiTenantLocalizationSource'
        }
    ];

    abp.localization.values = abp.localization.values || {};

    abp.localization.values['Abp'] = {
        "AllOfThesePermissionsMustBeGranted": "您没有权限进行此操作,您需要以下权限: {0}",
        "AtLeastOneOfThesePermissionsMustBeGranted": "您没有权限进行此操作,您至少需要下列权限的其中一项: {0}",
        "CurrentUserDidNotLoginToTheApplication": "当前用户没有登录到系统！",
        "DefaultFromSenderDisplayName": "默认发件人名字",
        "DefaultFromSenderEmailAddress": "默认发件人邮箱地址",
        "DefaultLanguage": "预设语言",
        "DomainName": "域名",
        "MainMenu": "主菜单",
        "Password": "密码",
        "ReceiveNotifications": "接收通知",
        "SmtpHost": "SMTP主机",
        "SmtpPort": "SMTP端口",
        "TimeZone": "时区",
        "UseDefaultCredentials": "使用默认验证",
        "Username": "用户名",
        "UseSSL": "使用SSL"
    };

    abp.localization.values['AbpWeb'] = {
        "AreYouSure": "你确定吗?",
        "Cancel": "取消",
        "InternalServerError": "对不起,在处理您的请求期间,产生了一个服务器内部错误!",
        "ValidationError": "您的请求无效!",
        "Yes": "确定"
    };

    abp.localization.values['AbpZero'] = {
        "CanNotDeleteAdminUser": "不能删除默认管理员{0}!",
        "CanNotDeleteStaticRole": "不能删除系统预定义角色: {0}",
        "CanNotRenameAdminUser": "不能重命名默认管理员的用户名 {0}",
        "Identity.DefaultError": "发生了一个未知的异常错误.",
        "Identity.DuplicateEmail": "邮箱地址 '{0}' 已被占用.",
        "Identity.DuplicateUserName": "名字{0}已被占用.",
        "Identity.ExternalLoginExists": "已存在此外部登陆用户.",
        "Identity.InvalidEmail": "邮箱地址 '{0}' 不符合要求.",
        "Identity.InvalidToken": "无效的token.",
        "Identity.InvalidUserName": "用户名{0}不符合要求, 只能包含字母和数字.",
        "Identity.LockoutNotEnabled": "对此用户，不能启用锁定.",
        "Identity.PasswordMismatch": "密码错误.",
        "Identity.PasswordRequireDigit": "密码至少要包含一位数字 ('0'-'9').",
        "Identity.PasswordRequireLower": "密码至少要包含一位小写字母 ('a'-'z').",
        "Identity.PasswordRequireNonLetterOrDigit": "密码必须包含一位非字母特殊符号或数字.",
        "Identity.PasswordRequireUpper": "密码至少要包含一位大写字母 ('A'-'Z').",
        "Identity.PasswordTooShort": "密码至少要{0}位.",
        "Identity.PropertyTooShort": "{0}不能为空.",
        "Identity.RoleNotFound": "角色{0}不存在.",
        "Identity.UserAlreadyHasPassword": "用户已设置密码.",
        "Identity.UserAlreadyInRole": "用户已拥有此角色.",
        "Identity.UserIdNotFound": "用户不存在.",
        "Identity.UserNameNotFound": "用户 {0} 不存在.",
        "Identity.UserNotInRole": "用户不包含此角色.",
        "InvalidTenancyName": "租户名无效!",
        "Ldap_Container": "容器",
        "Ldap_ContextType": "上下文类型",
        "Ldap_Domain": "域名",
        "Ldap_IsEnabled": "启用",
        "Ldap_Password": "密码",
        "Ldap_UserName": "用户名",
        "RoleDisplayNameIsAlreadyTaken": "角色显示名称 {0}已被占用.",
        "RoleNameIsAlreadyTaken": "角色名{0}已被占用.",
        "TenancyNameIsAlreadyTaken": "租户名{0} 已被占用."
    };

    abp.localization.values['AbpZeroTemplate'] = {
        "{0}UserCannotBeDeleted": "{不能删除0}用户.",
        "AboutUs": "关于我们",
        "AccountSettings": "账号设置",
        "Action": "操作",
        "ActionInformations": "操作信息",
        "Actions": "操作",
        "ActivationMailSentMessage": "已向您的邮箱发送了一封邮箱地址验证邮件，请查收.",
        "Active": "激活",
        "AddedTime": "添加时间",
        "AddFriend": "Add friend",
        "AddHiddenTrouble": "隐患上报",
        "AddMember": "添加成员",
        "AddRootUnit": "添加组织机构",
        "AddSubUnit": "添加子机构",
        "AddUser": "Add user",
        "AdminEmailAddress": "管理员邮箱",
        "administration": "系统管理",
        "Administration": "系统管理",
        "AdminPassword": "管理员密码",
        "AdminPasswordRepeat": "管理员密码(核对)",
        "AlarmMonitoring": "报警监控",
        "AlarmRecord": "报警记录",
        "AlarmStatistics": "报警统计",
        "All": "全部",
        "AllCachesSuccessfullyCleared": "全部缓存清除成功",
        "AllowTenantsToRegisterThemselves": "Allow tenants to register to the system.",
        "AllowTenantsToRegisterThemselves_Hint": "If you disable this, tenants will only be added by admin using tenant management page.",
        "AllowToRememberBrowserForTwoFactorLogin": "Allow to remember browser. If you allows this, users can select to remember browser to skip second time two factor login for the same browser.",
        "AllowUsersToRegisterThemselves": "允许用户注册.",
        "AllowUsersToRegisterThemselves_Hint": "如果此项被禁用，只能由管理员通过用户管理页面添加用户.",
        "Appearance": "Appearance",
        "ApplicationLogo": "Application Logo",
        "Apply": "应用",
        "AreYouSure": "您确定吗?",
        "AssetStatistics": "资产统计",
        "AssetType": "资产类型",
        "AuditLogDetail": "审计日志详情",
        "AuditLogImpersonatedOperationInfo": "说明:此操作由另一个用户代表该用户执行",
        "auditLogs": "审计日志",
        "AuditLogs": "审计日志",
        "Back": "返回",
        "BackToMyAccount": "返回我的账号",
        "BaseLanguage": "默认语言",
        "BaseValue": "默认值",
        "BasicData": "基础数据",
        "BlockedUsers": "Blocked Users",
        "BlockUser": "Block user",
        "Browse": "Browse",
        "Browser": "浏览器",
        "Caches": "缓存",
        "CachesHeaderInfo": "You can clear caches in application on this page.",
        "CacheSuccessfullyCleared": "缓存清除成功",
        "CameraManager": "监控管理",
        "Cancel": "取消",
        "CanNotChangeAdminUserName": "管理用户，不能修改用户名.",
        "CanNotEditOrDeleteDefaultLanguages": "不能删除默认语言.只能删除或者修改自己增加的语言. 但可以改变所有语言的文本信息.",
        "CaptchaCanNotBeEmpty": "验证码不能为空.",
        "Captha_Hint": "输入图片中的验证码:",
        "CascadeImpersonationErrorMessage": "不能进行模拟登录。这是一个错误登录!",
        "ChangePassword": "修改密码",
        "ChangePasswordBeforeLinkToAnAccount": "You must change your password before linking this account!",
        "ChangeProfilePicture": "修改头像",
        "ChangeTexts": "改变文本信息",
        "ChangingFeatures": "正在修改特性参数",
        "ChangingPermissions": "更改权限",
        "ChangingTexts": "正在修改文本信息",
        "Chat": "Chat",
        "ChatFeature": "Chat",
        "ChatFeatureIsNotEnabledForReceiver": "Chat is not enabled for tenant.",
        "ChatFeatureIsNotEnabledForSender": "Chat is not enabled for you.",
        "ChatIsNotConnectedWarning": "Chat is not connected.",
        "ChatUserSearch_Hint": "\r\n      Write only username for same tenant users, <br>\r\n      <strong>[tenancyName]\\[userName]</strong> for other tenant's users <br><br>\r\n      for example: <br>\r\n      .\\admin -> for host admin <br>\r\n      Test\\admin -> for test tenant's admin <br>\r\n      admin -> for your tenant's admin\r\n      ",
        "Clear": "清除",
        "ClearAll": "清除所有",
        "ClearedSuccessfully": "Cleared successfully",
        "ClickAnOrganizationUnitToSeeMembers": "鼠标点击左边机构所在行或者点击'机构成员'按钮查看机构成员",
        "ClickHere": "点击这里",
        "Client": "客户端",
        "Close": "关闭",
        "Code": "代码",
        "CommandAndDispatch": "指挥调度",
        "ConfirmationMailSentPleaseClickLinkInTheEmail": "已往您的{0}邮箱发送了一封邮件，请点击邮件中的链接，验证您的邮箱地址.",
        "ContentCoupletPerception": "物联感知",
        "CreateAnAccount": "注册",
        "CreateNewEdition": "创建新的版本",
        "CreateNewLanguage": "创建新的语言",
        "CreateNewRole": "添加角色",
        "CreateNewTenant": "添加租户",
        "CreateNewUser": "添加用户",
        "CreatingNewEdition": "创建一个新的版本",
        "CreatingNewLanguage": "正在创建新的语言",
        "CreatingNewRole": "添加角色",
        "CreatingNewTenant": "添加租户",
        "CreatingNewUser": "添加用户",
        "CreationTime": "创建时间",
        "CurrentPassword": "当前密码",
        "CustomCSS": "Custom CSS",
        "CustomData": "自定义数据",
        "CustomRange": "自定义范围",
        "DangerousGoods": "危险物品",
        "DangerousOperation": "危险作业",
        "Dashboard": "工作台",
        "DashboardHeaderInfo": "分析与报告",
        "DatabaseConnectionString": "Database connection string",
        "DateRange": "日期范围",
        "Default": "默认",
        "DefaultAccountLockoutDurationAsSeconds": "Account locking duration (as seconds)",
        "DefaultError": "默认错误",
        "DefaultErrorDetail": "默认错误详情",
        "DefaultFromAddress": "默认发送邮箱地址",
        "DefaultFromDisplayName": "默认发送人名字",
        "DefaultRole_Description": "新用户将默认拥有此角色.",
        "Delete": "删除",
        "DeletingEdition": "正在删除版本",
        "DeletingLanguages": "正在删除语言",
        "DeletingRole": "删除角色",
        "DeletingTenant": "删除租户",
        "DeletingUser": "删除用户",
        "Demo_SampleChatMessage": "Hi, This is a test message. Please login with my account in a different browser and checkout how chat feature works.",
        "Detection": "检测计划",
        "DifferentTenantImpersonationErrorMessage": "Can not impersonate a user of a different tenant!",
        "DisplayName": "显示名称",
        "DistrictManagement": "评测区域",
        "DistrictManagement2": "办公场所定义",
        "DistrictSet": "评测设置",
        "DistrictVisual": "办公场所可视化",
        "DomainName": "域名",
        "DontYouHaveAnAccount": "还不是系统用户?",
        "Download": "Download",
        "DownloadAll": "下载所有",
        "Duration": "持续时间",
        "Edit": "修改",
        "EditEdition": "编辑版本",
        "EditHiddenTrouble": "隐患列表-编辑隐患",
        "EditingEdition": "正在编辑版本",
        "EditingLanguage": "正在编辑语言",
        "EditingRole": "修改角色",
        "EditingTenant": "修改租户",
        "EditingUser": "修改用户",
        "Edition": "版本",
        "EditionDeleteWarningMessage": "{0}已经分配给租户的版本会被删除.",
        "EditionName": "版本名称",
        "EditionProperties": "版本属性列表",
        "Editions": "版本列表",
        "EditionsHeaderInfo": "管理当前应用的版本和特性参数",
        "EditLanguage": "编辑语言",
        "EditRole": "修改角色",
        "EditTenant": "修改租户",
        "EditText": "编辑文本",
        "EditUser": "修改用户",
        "EditUserPassword": "重置密码",
        "EducationalTraining": "在线考试",
        "EmailActivation": "发送激活邮件",
        "EmailActivation_ClickTheLinkBelowToVerifyYourEmail": "请点击以下链接确认您的邮箱地址,并激活您的用户账号:",
        "EmailActivation_Subject": "激活您的用户账号",
        "EmailActivation_SubTitle": "系统发送此邮件验证您的邮箱地址,并激活您的用户账号.",
        "EmailActivation_Title": "欢迎使用系统.",
        "EmailAddress": "邮箱地址",
        "EmailConfirm": "邮箱地址验认",
        "EmailConfirmationRequiredForLogin": "必须验证邮箱地址后才能登录.",
        "EmailSmtp": "邮箱 (SMTP)",
        "EmergencyPreparedness": "紧急预案",
        "EmptyOnes": "空值",
        "EnableLdapAuthentication": "启用轻量目录访问协议(LDAP)认证.",
        "EnableTwoFactorLogin": "Enable two factor user login.",
        "EnableUserAccountLockingOnFailedLoginAttemts": "Enable user account locking on failed login attempts",
        "EquipmentArchives": "资产管理",
        "EquipmentArchivesExpire": "资产更换",
        "Error": "错误!",
        "ErrorState": "错误状态",
        "ExaminationPaperManagement": "试卷管理",
        "ExportToExcel": "导出到Excel",
        "Failed": "失败",
        "Features": "特性参数列表",
        "File_Empty_Error": "Please select a file!",
        "File_Invalid_Type_Error": "Invalid file type!",
        "File_SizeLimit_Error": "Size of the file exceeds allowed limits!",
        "FilterByPermission": "Filter by permission",
        "FilterByRole": "Filter by role",
        "FilterOrAddUser": "Filter/Add user",
        "FireDrill": "消防演练",
        "FireEducation": "消防教育",
        "FireFightingAndRescue": "灭火救援",
        "FireMan": "职责指派",
        "Flag": "标记",
        "ForgotPassword": "不记得密码了?",
        "FormBasedRegistration": "基于表单身份验证",
        "FormIsNotValidMessage": "部分输入信息不符合要求，请检查并改正..",
        "Friends": "Friends",
        "FriendshipRequestAccepted": "Friendship request accepted",
        "FromTenantToHostImpersonationErrorMessage": "Can not impersonate a host user from a tenant user!",
        "General": "基本信息",
        "GoToApplication": "登录系统",
        "HangfireDashboard": "延迟型 仪表盘",
        "HasError": "出现错误",
        "HasOwnDatabase": "HasOwnDatabase",
        "HiddenDangerList": "隐患列表",
        "HiddenDangerManagement": "隐患监管",
        "HiddenTorubleAdd": "隐患添加",
        "HiddenTroubleCheck": "隐患审核",
        "HiddenTroubleRectify": "隐患整改",
        "HiddenTroubleReport": "隐患上报",
        "HiddenTroubleReview": "隐患复查",
        "HideAdvancedFilters": "隐藏高级过滤",
        "Home": "我的桌面",
        "HomePage": "主页",
        "ImpersonationTokenErrorMessage": "Impersonation token is invalid or expired!",
        "IncorrectCaptchaAnswer": "验证码无效.",
        "InspectionPointManagement": "巡检区域",
        "InvalidEmailAddress": "邮箱地址无效",
        "InvalidEmailConfirmationCode": "邮箱验证已失效",
        "InvalidEmailConfirmationCode_Detail": "请您务必通过点击邮件中的重置链接进入本页面.如果已经这样做了,还存在问题,请重试一遍邮箱验证操作!",
        "InvalidFeaturesWarning": "一个或者多个特性参数值无效",
        "InvalidFormMessage": "部分输入信息不符合要求，请检查并改正.",
        "InvalidPasswordResetCode": "密码重置已失效",
        "InvalidPasswordResetCode_Detail": "请您务必通过点击邮件中的重置链接进入本页面.如果已经这样做了,还存在问题,请重试一遍密码重置操作!",
        "InvalidSecurityCode": "Invalid security code!",
        "InvalidUserNameOrEmailAddress": "用户名或Email地址无效",
        "InvalidUserNameOrPassword": "用户名或密码无效",
        "InvlalidLanguageCode": "无效的语言代码.",
        "IpAddress": "IP地址",
        "IsEmailVerificationEnabled": "Enable email verification.",
        "IsLockoutEnabled": "Is lockout enabled ?",
        "IsLockoutEnabled_Hint": "User is locked for a while after a certain amount of failed login attempts.",
        "IsSmsVerificationEnabled": "Enable SMS verification.",
        "IsTwoFactorEnabled": "Is two factor authentication enabled?",
        "Key": "键值",
        "KeyArea": "重点区域",
        "Language": "语言",
        "LanguageDeleteWarningMessage": "确定要删除当前语言包吗 {0}?",
        "languages": "语言列表",
        "Languages": "语言列表",
        "LanguagesHeaderInfo": "管理语言包的文本头信息",
        "LanguageTexts": "语言的文本信息",
        "LanguageTextsHeaderInfo": "编辑语言的文本头信息.",
        "Last30Days": "最近30天",
        "Last7Days": "最近7天",
        "LastLoginTime": "上次登录时间",
        "LastMonth": "上个月",
        "LdapSettings": "LDAP设置",
        "LedgerManagement": "供应商管理",
        "LinkedAccounts": "链接账户",
        "LinkedUserDeleteWarningMessage": "Link to user {0} will be deleted.",
        "LinkNewAccount": "Link new account",
        "LogIn": "登录",
        "LoginAsThisTenant": "以该租户登录",
        "LoginAsThisUser": "以该用户登录",
        "LoginAttempts": "登录安全",
        "LoginFailed": "登录失败!",
        "LoginForTenants": "登录租户",
        "LoginForUsers": "登录用户",
        "LoginWith": "登录",
        "Logout": "注销",
        "LookHiddenTrouble": "查看隐患",
        "LookingForMpaVersion": "查找多页面应用版本号",
        "LookingForSpaVersion": "查找单页面应用版本号",
        "MailSent": "邮件已发送",
        "maintenance": "系统维护",
        "Maintenance": "系统维护",
        "MaintenanceManagement": "运维管理",
        "MaintenancePlan": "维保计划",
        "MaintenanceUnits": "供应商管理",
        "ManageAccounts": "管理账户",
        "ManageMembers_anchor": "管理成员",
        "ManageOrganizationTree_anchor": "管理组织机构树",
        "ManagingMembers": "管理成员",
        "ManagingOrganizationTree": "管理组织机构树",
        "MaxFailedAccessAttemptsBeforeLockout": "Maximum number of failed login attempt count before locking the account",
        "MaximumUserCount": "Maximum user count (0 = unlimited)",
        "MaximumUserCount_Error_Detail": "This tenant is allowed to have a maximum of {0} users.",
        "MaximumUserCount_Error_Message": "Reached to maximum allowed user count!",
        "MaxPasswordLength": "Maximum password length",
        "Members": "成员",
        "Message": "Message",
        "MinPasswordLength": "Minimum password length",
        "MyDesktop": "我的桌面",
        "MySettings": "我",
        "Name": "名字",
        "NameSurname": "姓名",
        "NewChatMessageEmail_Subject": "You have a new chat message",
        "NewChatMessageEmail_SubTitle": "",
        "NewChatMessageEmail_Title": "Message Details",
        "NewOrganizationUnit": "新组织机构",
        "NewPassword": "新密码",
        "NewPasswordRepeat": "新密码 (核对)",
        "NewRegisteredTenantsIsActiveByDefault": "New registered tenants are active by default.",
        "NewRegisteredTenantsIsActiveByDefault_Hint": "If you disable this, new tenants will not be active (and can not login) until admin manually activate the account.",
        "NewRegisteredUsersIsActiveByDefault": "注册用户默认激活.",
        "NewRegisteredUsersIsActiveByDefault_Hint": "如果此项被禁用，新用户需要通过邮件激活后才能登录.",
        "NewTenant": "New tenant",
        "NewTenantRegisteredNotificationDefinition": "On a new tenant registered to the application.",
        "NewTenantRegisteredNotificationMessage": "A new tenant registered to the application. Tenancy name: {tenancyName}.",
        "NewUserRegisteredNotificationDefinition": "注册到应用程序的新用户上",
        "NewUserRegisteredNotificationMessage": "A new user registered to the application. User name: {userName}, Email address: {emailAddress}.",
        "No": "否",
        "None": "无",
        "NoOrganizationUnitDefinedYet": "尚未定义组织机构",
        "NotAssigned": "没有分配",
        "Notice": "用户通知",
        "Notifications": "系统通知",
        "NotificationSettings": "系统通知设置",
        "NotificationTypes": "通知类型",
        "NotImpersonatedLoginErrorMessage": "This is not an impersonated login!",
        "Off": "关",
        "Ok": "确定",
        "On": "开",
        "OopsYouAreLost": "噢! 失踪了.",
        "Organizations": "组织架构",
        "OrganizationTree": "组织机构树",
        "OrganizationUnitDeleteWarningMessage": "您确定要删除组织结构中的[ {0} ]吗?",
        "OrganizationUnitMoveConfirmMessage": "请确认移动 {0} 到 {1} 下.",
        "organizationUnits": "组织机构",
        "OrganizationUnits": "组织机构",
        "OrganizationUnitsHeaderInfo": "管理组织机构用户数据",
        "Others": "Others",
        "OtherSettings": "其它设置",
        "Pages": "页面",
        "PaperManagement": "试题管理",
        "Parameters": "参数",
        "Password": "密码",
        "PasswordChangeDontRememberMessage": "忘记密码？ {0}.",
        "PasswordComplexity": "Password complexity",
        "PasswordComplexity_MaxLength_Hint": "Password must be maximum {0} characters",
        "PasswordComplexity_MinLength_Hint": "Password must be minimum {0} characters",
        "PasswordComplexity_UseLowerCaseLetters_Hint": "Password must contain at least 1 lower case letter",
        "PasswordComplexity_UseNumbers_Hint": "Password must contain at least 1 number",
        "PasswordComplexity_UsePunctuations_Hint": "Password must contain at least 1 special character",
        "PasswordComplexity_UseUpperCaseLetters_Hint": "Password must contain at least 1 upper case letter",
        "PasswordComplexityNotSatisfied": "Password complexity is not satisfied.",
        "PasswordRepeat": "密码 (核对)",
        "PasswordReset": "重置密码",
        "PasswordResetEmail_ClickTheLinkBelowToResetYourPassword": "请点击以下链接重置密码:",
        "PasswordResetEmail_Subject": "重置密码",
        "PasswordResetEmail_SubTitle": "进行密码重置.",
        "PasswordResetEmail_Title": "重置密码.",
        "PasswordResetMailSentMessage": "已向您的邮箱发送了一封密码重置邮件，请查收.",
        "PatrollingManagement": "巡检管理",
        "PatrolPath": "巡检分组",
        "PatrolPlan": "巡检计划",
        "PatrolPoint": "巡检节点",
        "PatrolRecord": "巡检报表",
        "PatrolTask": "巡检任务",
        "Permission": "权限",
        "Permissions": "权限",
        "PersonalInformations": "个人信息",
        "PhoneNumber": "Phone number",
        "PlansDemo": "预案演习",
        "PlanTemplate": "预案模板",
        "PlanTemplateManagement": "预案模板编辑",
        "PleaseEnterLoginInformation": "请输入登录信息",
        "PleaseEnterYourNewPassword": "请输入新密码.",
        "PrePlanManagement": "预案管理",
        "Previous": "向前",
        "ProfilePicture_Change_Error": "头像修改错误.",
        "ProfilePicture_Change_Info": "只能选择1mb内的JPG/JPEG/PNG图片.",
        "ProfilePicture_Warn_FileType": "只能选择1mb内的JPG/JPEG图片，请重新选择头像文件.",
        "ProfilePicture_Warn_SizeLimit": "只能选择1mb内的JPG/JPEG图片，请重新选择头像文件.",
        "RealTimeData": "实时数据",
        "RealTimeMonitoring": "实时监控",
        "ReceiveNotifications": "收到系统通知",
        "ReceiveNotifications_Definition": "此选项可用于完全启用/禁用接收通知",
        "ReceiveNotifications_DisableInfo": "您完全禁用接收通知。您可以启用它，并选择要接收的通知类型",
        "RectifyTrouble": "隐患整改-整改隐患",
        "Refresh": "刷新",
        "Register": "注册",
        "RegisterFormUserNameInvalidMessage": "Please do not enter an email address for username.",
        "RememberMe": "记住我",
        "RememberThisBrowser": "Remember this browser",
        "RemindList": "运维提醒",
        "RemoveUserFromOuWarningMessage": "确定从组织机构 {1} 中，移除用户 {0} ?",
        "RequestedFileDoesNotExists": "请求的文件不存在!",
        "Reset": "重置",
        "ResetFeaturesTooltip": "重置租户指定的特性参数设置并且保存.当前租户只会拥有已注册版本的特性参数.",
        "ResetPermissionsTooltip": "重置用户权限后，用户仅拥有所属角色包含的权限，为用户直接指定的权限将取消.",
        "ResetSpecialFeatures": "重置特殊的特性参数",
        "ResetSpecialPermissions": "重置直接指定权限",
        "ResetSuccessfully": "重置成功",
        "ResizedProfilePicture_Warn_SizeLimit": "Resized picture size must be smalled than 100KB. Please resize down and try again.",
        "ReviewTrouble": "隐患复查-复查隐患",
        "RiskDistribution": "安全评分",
        "RiskManagement": "安全分布",
        "RiskProfile": "安全评测",
        "Role": "角色",
        "RoleDeleteWarningMessage": "角色 {0} 将被删除，拥有此角色的用户将取消此角色.",
        "RoleName": "角色名称",
        "RoleProperties": "角色属性",
        "roles": "角色管理",
        "Roles": "角色管理",
        "RolesHeaderInfo": "使用角色进行权限分组.",
        "Root": "Root",
        "SafetyPropaganda": "消防资料",
        "SamplingInspectionRecords": "抽检记录",
        "Save": "保存",
        "SaveAll": "保存全部",
        "SaveAndClose": "保存 & 关闭",
        "SaveAndNext": "保存 & 文本",
        "SavedSuccessfully": "保存成功.",
        "SavingWithThreeDot": "保存中...",
        "SearchWithThreeDot": "搜索...",
        "Security": "安全",
        "SeeAllNotifications": "查看全部通知",
        "Select": "选择",
        "SelectAnItem": "选择一个项目",
        "SelectAnOrganizationUnitToSeeMembers": "选择一个机构查看成员",
        "SelectAUser": "选择一个用户",
        "SelfUserRegistrationIsDisabledMessage": "您不能注册!",
        "SelfUserRegistrationIsDisabledMessage_Detail": "注册功能被禁用，请联系您的系统管理员为您建立用户账号.",
        "Send": "发送",
        "SendActivationEmail": "发送激活邮件.",
        "SendEmailActivationLink_Information": "系统在几十秒内向您发送一封邮件,用于激活您的用户账号，请接收并点击邮件内容中的激活链接。如果在2分钟内还没收到这封邮件，请重试.",
        "Sender": "Sender",
        "SendPasswordResetLink_Information": "系统在几十秒内向您发送一封密码重置邮件，如果在3分钟内还没收到这封邮件，请重试.",
        "SendSecurityCode": "Send security code.",
        "SendSecurityCode_Information": "You should verify yourself to login. Please select a verification type. A code will be sent based on selected verification type.",
        "SendSecurityCodeErrorMessage": "Security code could not be sent!",
        "SendTestEmail": "Send Test Email",
        "Service": "服务",
        "SetAllAsRead": "一键设置已读",
        "SetAsDefaultLanguage": "设置当前语言为默认语言",
        "SetAsRead": "设为已读",
        "SetPassword": "修改密码",
        "SetRandomPassword": "使用随机密码.",
        "Settings": "设置",
        "SettingsHeaderInfo": "显示和修改程序设置.",
        "ShouldChangePasswordOnNextLogin": "下次登录需要修改密码.",
        "ShowAdvancedFilters": "显示高级过滤",
        "SignUp": "登录",
        "SmtpHost": "SMTP服务器",
        "SmtpPort": "SMTP端口",
        "Source": "选择源",
        "Static": "系统",
        "StaticRole_Tooltip": "不能删除系统角色.",
        "Submit": "提交",
        "Success": "成功",
        "SuccessfullyAdded": "添加成功",
        "SuccessfullyDeleted": "删除成功.",
        "SuccessfullyMoved": "成功移动",
        "SuccessfullyRegistered": "注册成功",
        "SuccessfullyRemoved": "移除操作成功",
        "SuccessfullySaved": "保存成功.",
        "SuccessfullyUnlinked": "Successfully unlinked",
        "Surname": "姓氏",
        "SwitchToLinkedAccountTokenErrorMessage": "Impersonation token is invalid or expired!",
        "Syschecked": "安全评估",
        "TargetLanguage": "目标语言",
        "TargetUserNotFoundProbablyDeleted": "Target user could not be found. It's probably deleted.",
        "TargetValue": "目标值",
        "TaskReview": "巡检审查",
        "TenancyCodeName": "租户编码",
        "TenancyName": "租户名称",
        "TenantDatabaseConnectionStringChangeWarningMessage": "Notice: Before changing the database connection string for a tenant, you should move the tenant database to the new location. Changing connection string does not move the tenant database.",
        "TenantDeleteWarningMessage": "租户 {0} 将被删除.",
        "TenantInformations": "租户信息",
        "TenantIsNotActive": "租户 {0} 未激活.",
        "TenantManagement": "Tenant management",
        "TenantName": "租户名称",
        "TenantName_Regex_Description": "租户名称必须由2个以上字母、数字、-、_组成,以字母开头",
        "TenantNameCanNotBeEmpty": "租户名不能为空",
        "Tenants": "租户",
        "TenantSelection": "选择租户",
        "TenantSelection_Detail": "请选择一个租户",
        "TenantsHeaderInfo": "管理租户.",
        "TenantSignUp": "Tenant SignUp",
        "TenantToHostChatFeature": "Chat with host",
        "TenantToHostChatFeatureIsNotEnabledForReceiver": "Chat with host is not enabled for tenant.",
        "TenantToHostChatFeatureIsNotEnabledForSender": "Chat with host is not enabled for you.",
        "TenantToTenantChatFeature": "Chat with other tenants",
        "TenantToTenantChatFeatureIsNotEnabledForReceiver": "Chat with other tenants is not enabled for tenant.",
        "TenantToTenantChatFeatureIsNotEnabledForSender": "Chat with other tenants is not enabled for you.",
        "TestEmail_Body": "This is a test email.",
        "TestEmail_Subject": "WeSafe test email",
        "TestEmailSentSuccessfully": "Test e-mail sent successfully.",
        "TestEmailSettingsHeader": "Test Email Settings",
        "TestScore": "考试成绩",
        "ThereIsNoNotification": "没有通知",
        "ThereIsNoTenantDefinedWithName{0}": "租户 {0}不存在",
        "ThisLanguageAlreadyExists": "这种语言已经存在!",
        "ThisMonth": "这个月",
        "ThisWebSiteRootAddress": "网站http根路径",
        "ThisWebSiteRootAddress_Hint": "示例： http://wutos.com/ ，用于外部链接本系统，如密码重置链接",
        "Time": "时间",
        "Timezone": "时区",
        "TimeZoneSettingChangedRefreshPageNotification": "Timezone setting changed. Click OK button to refresh page and changes to take effect.",
        "Today": "今天",
        "TransitionManager": "运维项目",
        "TwoFactorLogin": "Two Factor Login",
        "TypeAMessageHere": "Type a message here...",
        "UnblockUser": "Unblock",
        "Unlock": "Unlock",
        "UnlockedTenandAdmin": "Unlocked admin user for {0}",
        "UnlockedTheUser": "Unlocked the user {0}",
        "Unread": "未读",
        "Upload": "Upload",
        "UploadCSS_Info": "Select a .css file with a maximum of 1MB size.",
        "UploadLogo_Info": "Select a JPG/JPEG/PNG/GIF file with a maximum of 30KB size and 168x33 pixel resolution.",
        "UseCaptchaOnRegistration": "用户注册时使用图片验证码(captcha).",
        "UseDefaultCredentials": "默认身份验证",
        "UseDefaultSettings": "Use default settings",
        "UseHostDatabase": "Use host database",
        "UseLowerCaseLetters": "Use lower case letters in password",
        "UseNumbers": "Use numbers in password",
        "UsePunctuations": "Use punctuations in password",
        "UserBlocked": "User blocked successfully.",
        "UserDeleteWarningMessage": "用户 {0} 将被删除.",
        "UserEmailIsNotConfirmedAndCanNotLogin": "您的邮箱未通过验证.请检查您的邮箱地址是否正确,查收邮件并点击邮件内容中的验证链接进行验证和激活.如果没有收到邮件,请点击[邮箱验证],系统会重新发送一封邮件.",
        "UserInformations": "用户信息",
        "UserIsAlreadyInTheOrganizationUnit": "该用户已经在组织机构中存在",
        "UserIsBlocked": "User is blocked.",
        "UserIsNotActiveAndCanNotLogin": "用户 {0} 未激活，不能登录.",
        "UserLockedOutMessage": "The user account has been locked out. Please try again later.",
        "UserLockOut": "User Lock Out",
        "UserManagement": "用户管理",
        "UserName": "用户名",
        "UserNameOrEmail": "用户名或邮箱地址",
        "users": "用户管理",
        "Users": "用户管理",
        "UserSendYouAFriendshipRequest": "{0} added you as a friend.",
        "UsersHeaderInfo": "管理用户及权限.",
        "UserTask": "用户任务",
        "UserUnblocked": "Block removed from user successfully.",
        "UseSsl": "使用SSL",
        "UseUpperCaseLetters": "Use upper case letters in password",
        "VerificationCode": "Verification code",
        "VerifySecurityCode": "Verify Security Code",
        "VerifySecurityCode_Information": "Please enter the verification code sent to you.",
        "VerifySecurityCodeNotLoggedInErrorMessage": "You should be login first, in order to verify yourself! Probably, your login has been timeout. Please go to the login page and re-try it.",
        "VideoManagement": "视频设备",
        "VideoSurveillance": "视频监管",
        "VisualAssests": "可视化资产管理",
        "WebSiteLogs": "Website Logs",
        "WebSiteLogsHeaderInfo": "You can see latest logs in this page or download all logs in a single zip file.",
        "WeCanNotFindThePage": "我们无法提供您想要访问的页面.",
        "WelcomePage_Title": "欢迎!",
        "WelcomeToTheApplicationNotificationMessage": "Welcome to WeSafe! Notification system is used to inform you for intended events. You can select which type of notifications you want to receive from the notification settings.",
        "WeSafe_Pages": "消防平台功能页面",
        "WriteThePlan": "撰写预案",
        "Xms": "{0} ms",
        "Yes": "是",
        "YesDelete": "是, 执行删除!",
        "Yesterday": "昨天",
        "YouAlreadySentAFriendshipRequestToThisUser": "You already added this user.",
        "YouCanBackToYourAccount": "回到你的帐户",
        "YouCannotBeFriendWithYourself": "You can not be friend with yourself.",
        "YouCanNotDeleteOwnAccount": "不能删除自己的用户帐户",
        "YouCannotLinkToSameAccount": "You can not link to same account!",
        "YouDontHaveAnyBlockedFriend": "You don't have any blocked users. In order to block a friend, select a friend and select block from actions dropdown.",
        "YouDontHaveAnyFriend": "You don't have any friends. Write a username to above input box and click \"Add Friend\" button.",
        "YourAccountIsWaitingToBeActivatedByAdmin": "您的用户账号尚未激活，待系统管理员激活后方能登录使用系统.",
        "YourEmailIsConfirmedMessage": "您的邮箱已通过验证.",
        "YourPasswordHasChangedSuccessfully": "密码修改成功."
    };


})();

(function () {

    abp.features = abp.features || {};

    abp.features.allFeatures = {
        'App.MaxUserCount': {
            value: '0'
        },
        'App.ChatFeature': {
            value: 'True'
        },
        'App.ChatFeature.TenantToTenant': {
            value: 'True'
        },
        'App.ChatFeature.TenantToHost': {
            value: 'True'
        }
    };

})();

(function () {

    abp.auth = abp.auth || {};
    
    //abp.auth.allPermissions = {
    //    'Pages': true,
    //    'WeSafe.Pages': true,
    //    'Pages.Administration': true,
    //    'Pages.Administration.Roles': true,
    //    'Pages.Administration.Roles.Create': true,
    //    'Pages.Administration.Roles.Edit': true,
    //    'Pages.Administration.Roles.Delete': true,
    //    'Pages.Administration.Users': true,
    //    'Pages.Administration.Users.Create': true,
    //    'Pages.Administration.Users.Edit': true,
    //    'Pages.Administration.Users.Delete': true,
    //    'Pages.Administration.Users.ChangePermissions': true,
    //    'Pages.Administration.Users.Impersonation': true,
    //    'Pages.Administration.Languages': true,
    //    'Pages.Administration.Languages.Create': true,
    //    'Pages.Administration.Languages.Edit': true,
    //    'Pages.Administration.Languages.Delete': true,
    //    'Pages.Administration.Languages.ChangeTexts': true,
    //    'Pages.Administration.AuditLogs': true,
    //    'Pages.Administration.OrganizationUnits': true,
    //    'Pages.Administration.OrganizationUnits.ManageOrganizationTree': true,
    //    'Pages.Administration.OrganizationUnits.ManageMembers': true,
    //    'Pages.Administration.Tenant.Settings': true,
    //    'Pages.Administration.Host.Settings': true,
    //    'Pages.Administration.Host.Maintenance': true,
    //    'Pages.Administration.HangfireDashboard': true,
    //    'Pages.Tenant.Dashboard': true,
    //    'Pages.Editions': true,
    //    'Pages.Editions.Create': true,
    //    'Pages.Editions.Edit': true,
    //    'Pages.Editions.Delete': true,
    //    'Pages.Tenants': true,
    //    'Pages.Tenants.Create': true,
    //    'Pages.Tenants.Edit': true,
    //    'Pages.Tenants.ChangeFeatures': true,
    //    'Pages.Tenants.Delete': true,
    //    'Pages.Tenants.Impersonation': true,
    //    'WeSafe.Pages.MyDesktop': true,
    //    'WeSafe.Pages.AlarmMonitoring': true,
    //    'WeSafe.Pages.RealTimeMonitoring': true,
    //    'WeSafe.Pages.RealTimeData': true,
    //    'WeSafe.Pages.AlarmRecord': true,
    //    'WeSafe.Pages.AlarmStatistics': true,
    //    'WeSafe.Pages.MaintenanceManagement': true,
    //    'WeSafe.Pages.EquipmentArchives': true,
    //    'WeSafe.Pages.EquipmentArchivesExpire': true,
    //    'WeSafe.Pages.MaintenancePlan': true,
    //    'WeSafe.Pages.TransitionManager': true,
    //    'WeSafe.Pages.Detection': true,
    //    'WeSafe.Pages.AssetType': true,
    //    'WeSafe.Pages.RemindList': true,
    //    'WeSafe.Pages.MaintenanceUnits': true,
    //    'WeSafe.Pages.RiskProfile': true,
    //    'WeSafe.Pages.DistrictManagement': true,
    //    'WeSafe.Pages.RiskManagement': true,
    //    'WeSafe.Pages.RiskDistribution': true,
    //    'WeSafe.Pages.DistrictSet': true,
    //    'WeSafe.Pages.HiddenDangerManagement': true,
    //    'WeSafe.Pages.VideoSurveillance': true,
    //    'WeSafe.Pages.HiddenDangerList': true,
    //    'WeSafe.Pages.AddHiddenTrouble': true,
    //    'WeSafe.Pages.LookHiddenTrouble': true,
    //    'WeSafe.Pages.HiddenTroubleRectify': true,
    //    'WeSafe.Pages.HiddenTroubleReview': true,
    //    'WeSafe.Pages.RectifyTrouble': true,
    //    'WeSafe.Pages.ReviewTrouble': true,
    //    'WeSafe.Pages.EditHiddenTrouble': true,
    //    'WeSafe.Pages.HiddenTroubleCheck': true,
    //    'WeSafe.Pages.FireEducation': true,
    //    'WeSafe.Pages.SafetyPropaganda': true,
    //    'WeSafe.Pages.PaperManagement': true,
    //    'WeSafe.Pages.ExaminationPaperManagement': true,
    //    'WeSafe.Pages.EducationalTraining': true,
    //    'WeSafe.Pages.TestScore': true,
    //    'WeSafe.Pages.PatrollingManagement': true,
    //    'WeSafe.Pages.PatrolPath': true,
    //    'WeSafe.Pages.PatrolTask': true,
    //    'WeSafe.Pages.PatrolPoint': true,
    //    'WeSafe.Pages.PatrolPlan': true,
    //    'WeSafe.Pages.TaskReview': true,
    //    'WeSafe.Pages.PatrolRecord': true,
    //    'WeSafe.Pages.InspectionPointManagement': true,
    //    'WeSafe.Pages.EmergencyPreparedness': true,
    //    'WeSafe.Pages.PrePlanManagement': true,
    //    'WeSafe.Pages.PlanTemplate': true,
    //    'WeSafe.Pages.WriteThePlan': true,
    //    'WeSafe.Pages.BasicData': true,
    //    'WeSafe.Pages.DistrictManagement2': true,
    //    'WeSafe.Pages.DistrictVisual': true,
    //    'WeSafe.Pages.FireMan': true,
    //    'WeSafe.Pages.VisualAssests': true,
    //    'WeSafe.Pages.Notice': true,
    //    'WeSafe.Pages.UserTask': true,
    //    'WeSafe.Pages.KeyArea': true,
    //    'WeSafe.Pages.CameraManager': true
    //};

    //abp.auth.grantedPermissions = {
    //    'WeSafe.Pages.MyDesktop': true,
    //};

})();

(function () {
    abp.nav = {};
    abp.nav.menus = {
        'MainMenu': {
            name: 'MainMenu',
            displayName: '主菜单',
            items: [
            //     {
            //     name: 'MyDesktop',
            //     order: 0,
            //     icon: 'icon-home',
            //     url: 'MyDesktop',
            //     displayName: '我的桌面',
            //     isEnabled: true,
            //     isVisible: true,
            //     items: []
            // },
             {
                name: 'MyDesktop',
                order: 0,
                icon: 'icon-home',
                url: 'MyDesktop',
                displayName: '我的桌面',
                isEnabled: true,
                isVisible: true,
                items: []
            }, {
                name: 'AlarmMonitoring',
                order: 0,
                icon: 'icon-list',
                url: 'AlarmMonitoring',
                displayName: '报警监控',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'RealTimeMonitoring',
                    order: 0,
                    url: 'RealTimeMonitoring',
                    displayName: '实时监控',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'RealTimeData',
                    order: 0,
                    url: 'RealTimeData',
                    displayName: '实时数据',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AlarmRecord',
                    order: 0,
                    url: 'AlarmRecord',
                    displayName: '报警记录',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AlarmStatistics',
                    order: 0,
                    url: 'AlarmStatistics',
                    displayName: '报警统计',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'MaintenanceManagement',
                order: 0,
                icon: 'icon-share',
                url: 'MaintenanceManagement',
                displayName: '运维管理',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'EquipmentArchives',
                    order: 0,
                    url: 'EquipmentArchives',
                    displayName: '资产管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EquipmentArchivesExpire',
                    order: 0,
                    url: 'EquipmentArchivesExpire',
                    displayName: '资产更换',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'MaintenancePlan',
                    order: 0,
                    url: 'MaintenancePlan',
                    displayName: '维保计划',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'MaintenanceTask',
                    order: 0,
                    url: 'MaintenanceTask',
                    displayName: '运维任务',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }
                , {
                    name: 'RepairManager',
                    order: 0,
                    url: 'RepairManager',
                    displayName: '维修管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }
                , {
                    name: 'Detection',
                    order: 0,
                    url: 'Detection',
                    displayName: '检测计划',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'TransitionManager',
                    order: 0,
                    url: 'TransitionManager',
                    displayName: '运维项目',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AssetType',
                    order: 0,
                    url: 'AssetType',
                    displayName: '资产类型',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'RemindList',
                    order: 0,
                    url: 'RemindList',
                    displayName: '运维提醒',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'MaintenanceUnits',
                    order: 0,
                    url: 'MaintenanceUnits',
                    displayName: '供应商管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'RiskProfile',
                order: 0,
                icon: 'icon-star',
                url: 'RiskProfile',
                displayName: '安全评测',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'DistrictManagement',
                    order: 0,
                    url: 'DistrictManagement',
                    displayName: '评测区域',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'DistrictChecked',
                    order: 0,
                    url: 'DistrictChecked',
                    displayName: '[District checked]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'RiskManagement',
                    order: 0,
                    url: 'RiskManagement',
                    displayName: '安全分布',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'RiskDistribution',
                    order: 0,
                    url: 'RiskDistribution',
                    displayName: '安全评分',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'HiddenDangerManagement',
                order: 0,
                icon: 'icon-shield',
                url: 'HiddenDangerManagement',
                displayName: '隐患监管',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'VideoSurveillance',
                    order: 0,
                    url: 'VideoSurveillance',
                    displayName: '视频监管',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'HiddenDangerList',
                    order: 0,
                    url: 'HiddenDangerList',
                    displayName: '隐患列表',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AddHiddenTrouble',
                    order: 0,
                    url: 'AddHiddenTrouble',
                    displayName: '隐患上报',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'HiddenTroubleCheck',
                    order: 0,
                    url: 'HiddenTroubleCheck',
                    displayName: '隐患审核',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AuditHiddenTrouble',
                    order: 0,
                    url: 'AuditHiddenTrouble',
                    displayName: '审计隐患',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'LookHiddenTrouble',
                    order: 0,
                    url: 'LookHiddenTrouble',
                    displayName: '查看隐患',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'HiddenTroubleRectify',
                    order: 0,
                    url: 'HiddenTroubleRectify',
                    displayName: '隐患整改',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'HiddenTroubleReview',
                    order: 0,
                    url: 'HiddenTroubleReview',
                    displayName: '隐患复查',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'RectifyTrouble',
                    order: 0,
                    url: 'RectifyTrouble',
                    displayName: '隐患整改-整改隐患',
                    isEnabled: true,
                    isVisible: false,
                    items: []
                }, {
                    name: 'ReviewTrouble',
                    order: 0,
                    url: 'ReviewTrouble',
                    displayName: '隐患复查-复查隐患',
                    isEnabled: true,
                    isVisible: false,
                    items: []
                }, {
                    name: 'EditHiddenTrouble',
                    order: 0,
                    url: 'EditHiddenTrouble',
                    displayName: '隐患列表-编辑隐患',
                    isEnabled: true,
                    isVisible: false,
                    items: []
                }]
            }, {
                name: 'FireEducation',
                order: 0,
                icon: 'icon-feed',
                url: 'FireEducation',
                displayName: '消防教育',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'SafetyPropaganda',
                    order: 0,
                    url: 'SafetyPropaganda',
                    displayName: '消防资料',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PaperManagement',
                    order: 0,
                    url: 'PaperManagement',
                    displayName: '试题管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'ExaminationPaperManagement',
                    order: 0,
                    url: 'ExaminationPaperManagement',
                    displayName: '试卷管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EducationalTraining',
                    order: 0,
                    url: 'EducationalTraining',
                    displayName: '在线考试',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'TestScore',
                    order: 0,
                    url: 'TestScore',
                    displayName: '考试成绩',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'PatrollingManagement',
                order: 0,
                icon: 'icon-calendar',
                url: 'PatrollingManagement',
                displayName: '巡检管理',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'BuildGroup',
                    order: 0,
                    url: 'BuildGroup',
                    displayName: '[Build group]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AddTemporaryTask',
                    order: 0,
                    url: 'AddTemporaryTask',
                    displayName: '[Add temporary task]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AuditTask',
                    order: 0,
                    url: 'AuditTask',
                    displayName: '[Audit task]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'ReviewTask',
                    order: 0,
                    url: 'ReviewTask',
                    displayName: '[Review task]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'LookTask',
                    order: 0,
                    url: 'LookTask',
                    displayName: '[Look task]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AddPlan',
                    order: 0,
                    url: 'AddPlan',
                    displayName: '[Add plan]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'AddPoint',
                    order: 0,
                    url: 'AddPoint',
                    displayName: '[Add point]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EditPoint',
                    order: 0,
                    url: 'EditPoint',
                    displayName: '[Edit point]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EditPath',
                    order: 0,
                    url: 'EditPath',
                    displayName: '[Edit path]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EditPlan',
                    order: 0,
                    url: 'EditPlan',
                    displayName: '[Edit plan]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'ExecuteTask',
                    order: 0,
                    url: 'ExecuteTask',
                    displayName: '[Execute task]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PatrolTask',
                    order: 0,
                    url: 'PatrolTask',
                    displayName: '巡检任务',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PatrolRecord',
                    order: 0,
                    url: 'PatrolRecord',
                    displayName: '巡检报表',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'InspectionPointManagement',
                    order: 0,
                    url: 'InspectionPointManagement',
                    displayName: '巡检区域',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PatrolPlan',
                    order: 0,
                    url: 'PatrolPlan',
                    displayName: '巡检计划',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PatrolPath',
                    order: 0,
                    url: 'PatrolPath',
                    displayName: '巡检分组',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'EmergencyPreparedness',
                order: 0,
                icon: 'icon-rocket',
                url: 'EmergencyPreparedness',
                displayName: '紧急预案',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'PrePlanManagement',
                    order: 0,
                    url: 'PrePlanManagement',
                    displayName: '预案管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PlanTemplate',
                    order: 0,
                    url: 'PlanTemplate',
                    displayName: '预案模板',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'WriteThePlan',
                    order: 0,
                    url: 'WriteThePlan',
                    displayName: '撰写预案',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'WriteTemplate',
                    order: 0,
                    url: 'WriteTemplate',
                    displayName: '[Write template]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'addPlanTemplate',
                    order: 0,
                    url: 'addPlanTemplate',
                    displayName: '[add plan template]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'PlansDemo',
                    order: 0,
                    url: 'PlansDemo',
                    displayName: '预案演习',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'TemplateDemo',
                    order: 0,
                    url: 'TemplateDemo',
                    displayName: '[Template demo]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'BasicData',
                order: 0,
                icon: 'icon-fire',
                url: 'BasicData',
                displayName: '基础数据',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'DistrictManagement2',
                    order: 0,
                    url: 'DistrictManagement2',
                    displayName: '办公场所定义',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'DistrictVisual',
                    order: 0,
                    url: 'DistrictVisual',
                    displayName: '办公场所可视化',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'FireMan',
                    order: 0,
                    url: 'FireMan',
                    displayName: '职责指派',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'VisualAssests',
                    order: 0,
                    url: 'VisualAssests',
                    displayName: '可视化资产管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'Notice',
                    order: 0,
                    url: 'Notice',
                    displayName: '用户通知',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'UserTask',
                    order: 0,
                    url: 'UserTask',
                    displayName: '用户任务',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'KeyArea',
                    order: 0,
                    url: 'KeyArea',
                    displayName: '重点区域',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'CameraManager',
                    order: 0,
                    url: 'CameraManager',
                    displayName: '监控管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'EditCamera',
                    order: 0,
                    url: 'EditCamera',
                    displayName: '[Edit camera]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'Administration',
                order: 0,
                icon: 'icon-wrench',
                url: 'Administration',
                displayName: '系统管理',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'organizationUnits',
                    order: 0,
                    url: 'organizationUnits',
                    displayName: '组织机构',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'roles',
                    order: 0,
                    url: 'roles',
                    displayName: '角色管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'users',
                    order: 0,
                    url: 'users',
                    displayName: '用户管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'maintenance',
                    order: 0,
                    url: 'maintenance',
                    displayName: '系统维护',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'createOrEditUnitModal',
                    order: 0,
                    url: 'createOrEditUnitModal',
                    displayName: '[create or edit unit modal]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'addMember',
                    order: 0,
                    url: 'addMember',
                    displayName: '[add member]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'assertReport',
                    order: 0,
                    url: 'assertReport',
                    displayName: '[assert report]',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }, {
                name: 'Editions',
                order: 0,
                icon: 'icon-grid',
                url: 'host.editions',
                displayName: '版本列表',
                isEnabled: true,
                isVisible: true,
                items: []
            }, {
                name: 'Administration',
                order: 0,
                icon: 'icon-wrench',
                displayName: '系统管理',
                isEnabled: true,
                isVisible: true,
                items: [{
                    name: 'Administration.OrganizationUnits',
                    order: 0,
                    icon: 'icon-layers',
                    url: 'organizationUnits',
                    displayName: '组织机构',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'Administration.Roles',
                    order: 0,
                    icon: 'icon-briefcase',
                    url: 'roles',
                    displayName: '角色管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'Administration.Users',
                    order: 0,
                    icon: 'icon-users',
                    url: 'users',
                    displayName: '用户管理',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'Administration.AuditLogs',
                    order: 0,
                    icon: 'icon-lock',
                    url: 'auditLogs',
                    displayName: '审计日志',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }, {
                    name: 'Administration.Maintenance',
                    order: 0,
                    icon: 'icon-wrench',
                    url: 'host.maintenance',
                    displayName: '系统维护',
                    isEnabled: true,
                    isVisible: true,
                    items: []
                }]
            }]
        }
        , 'Frontend': {
            name: 'Frontend',
            displayName: 'Frontend menu',
            items: [{
                name: 'Frontend.Home',
                order: 0,
                displayName: '主页',
                isEnabled: true,
                isVisible: true,
                items: []
            }, {
                name: 'Frontend.About',
                order: 0,
                url: 'About',
                displayName: '关于我们',
                isEnabled: true,
                isVisible: true,
                items: []
            }]
        }
        , 'Mpa': {
            name: 'Mpa',
            displayName: 'Main Menu',
            items: []
        }
    };
})();


(function () {
    abp.setting = abp.setting || {};
    abp.setting.values = {

        'Abp.Localization.DefaultLanguageName': 'zh-CN',
        'Abp.Notifications.ReceiveNotifications': 'true',
        'Abp.Timing.TimeZone': 'UTC',
        'Abp.Zero.UserManagement.IsEmailConfirmationRequiredForLogin': 'false',
        'Abp.Zero.OrganizationUnits.MaxUserMembershipCount': '2147483647',
        'Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled': 'false',
        'Abp.Zero.UserManagement.TwoFactorLogin.IsRememberBrowserEnabled': 'true',
        'Abp.Zero.UserManagement.TwoFactorLogin.IsEmailProviderEnabled': 'true',
        'Abp.Zero.UserManagement.TwoFactorLogin.IsSmsProviderEnabled': 'true',
        'Abp.Zero.UserManagement.ShouldChangePasswordOnNextLogin.IsEnabled': 'false',
        'Abp.Zero.UserManagement.SetRandomPassword.IsEnabled': 'false',
        'Abp.Zero.UserManagement.UserLockOut.IsEnabled': 'false',
        'Abp.Zero.UserManagement.UserLockOut.MaxFailedAccessAttemptsBeforeLockout': '5',
        'Abp.Zero.UserManagement.UserLockOut.DefaultAccountLockoutSeconds': '300',
        'Abp.Zero.UserManagement.PasswordComplexity.RequireDigit': 'false',
        'Abp.Zero.UserManagement.PasswordComplexity.RequireLowercase': 'false',
        'Abp.Zero.UserManagement.PasswordComplexity.RequireNonAlphanumeric': 'false',
        'Abp.Zero.UserManagement.PasswordComplexity.RequireUppercase': 'false',
        'Abp.Zero.UserManagement.PasswordComplexity.RequiredLength': '3'
    };

})();

(function () {
    abp.clock.provider = abp.timing.localClockProvider || abp.timing.localClockProvider;
    abp.clock.provider.supportsMultipleTimezone = false;
})();

(function () {
    abp.security.antiForgery.tokenCookieName = 'XSRF-TOKEN';
    abp.security.antiForgery.tokenHeaderName = 'X-XSRF-TOKEN';
})();

(function () {
    abp.event.trigger('abp.dynamicScriptsInitialized');
})();