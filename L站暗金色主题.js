// ==UserScript==
// @name         linux.do 暗金色主题
// @namespace    https://linux.do/
// @version      1.5
// @description  黑底 + 金色文字 + 金色滚动条，仅对 linux.do 生效（含标签、通知、下拉、侧边栏、搜索、聊天抽屉、用户通知）
// @author       Bymode
// @match        https://linux.do/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const GOLD       = '#ffcc66';
  const GOLD_SOFT  = '#e6b85c';
  const BG_MAIN    = '#111111';
  const BG_SOFT    = '#181818';
  const BG_STRONG  = '#000000';
  const BORDER     = 'rgba(255,255,255,0.20)';

  const css = `
    /* 全局：黑底 + 金色文字 */
    html, body {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
    }

    /* 主内容容器 */
    #main-outlet {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }

    /* 顶部导航栏 */
    .d-header {
      background-color: ${BG_STRONG} !important;
      border-bottom: 1px solid ${BORDER} !important;
      color: ${GOLD} !important;
    }
    .d-header .wrap {
      background-color: transparent !important;
    }
    .d-header a {
      color: ${GOLD} !important;
    }
    .d-header a:hover {
      color: ${GOLD_SOFT} !important;
    }

    /* 顶部文字版站点标题（如果有） */
    .d-header .title,
    .d-header .site-title,
    .d-header .title a,
    .d-header .site-title a {
      color: ${GOLD} !important;
    }

    /* 首页 logo 区域：在图片旁边加一行金色文字，不改图片颜色 */
    .home-logo-wrapper-outlet .title a::after {
      content: "LINUX DO";
      color: ${GOLD} !important;
      font-weight: 700;
      margin-left: 8px;
      font-size: 1.2em;
      vertical-align: middle;
    }

    /* 顶部搜索框（header 搜索） */
    .search-input.search-input--header {
      background-color: ${BG_STRONG} !important;
      border: 1px solid ${BORDER} !important;
      color: ${GOLD} !important;
    }
    .search-input.search-input--header .search-term__input,
    #header-search-input.search-term__input {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border: none !important;
    }
    #header-search-input::placeholder {
      color: ${GOLD_SOFT} !important;
    }
    .search-input.search-input--header .btn,
    .search-input.search-input--header .btn .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }

    /* 顶部过滤条 / 导航条 */
    .navigation-container,
    .navigation-topics,
    .list-controls,
    .category-breadcrumb {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }

    /* 帖子列表区域 */
    #list-area,
    .latest-topic-list,
    .topic-list {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .topic-list .topic-list-item {
      background-color: ${BG_MAIN} !important;
      border-bottom: 1px solid ${BORDER} !important;
    }
    .topic-list .topic-list-item:hover,
    .latest-topic-list .topic-list-item:hover {
      background-color: ${BG_SOFT} !important;
    }

    /* 帖子内容页 */
    .topic-body,
    .topic-post,
    .post-stream,
    .cooked,
    .regular,
    .timeline-container,
    .topic-map,
    .topic-map .map,
    .post-controls,
    .topic-above-post-stream-outlet,
    .topic-below-post-stream-outlet,
    .timeline-footer {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }

    /* 编辑器 / 回复框 / 新话题对话框 */
    .reply-area,
    .reply-area .composer,
    .composer-popup-container {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-top: 1px solid ${BORDER} !important;
    }
    /* 顶部黄色提示条：请在发帖前仔细阅读… */
    .alert-composer-notice.alert-warning {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .alert-composer-notice .text a {
      color: ${GOLD} !important;
      text-decoration: underline;
    }
    .reply-to,
    .reply-details,
    .composer-controls {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
    }
    .composer-controls .btn,
    .composer-controls .btn .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
    /* 标题 / 分类 / 标签 区 */
    .composer-fields,
    .title-and-category,
    .title-input,
    .category-input,
    .tags-input {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    #reply-title {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    #reply-title::placeholder {
      color: ${GOLD_SOFT} !important;
    }
    .category-chooser .select-kit-header,
    .tags-input .select-kit-header {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    .category-chooser .select-kit-header .name,
    .tags-input .select-kit-header .formatted-selection {
      color: ${GOLD} !important;
    }
    .category-chooser .caret-icon,
    .tags-input .caret-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    /* 编辑器主体 + 工具栏 + 预览 */
    .d-editor-container,
    .d-editor-textarea-column,
    .d-editor-textarea-wrapper {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .d-editor-button-bar {
      background-color: ${BG_STRONG} !important;
      border-bottom: 1px solid ${BORDER} !important;
    }
    .d-editor-button-bar .toolbar__button,
    .d-editor-button-bar .composer-toggle-switch,
    .d-editor-button-bar .toolbar-menu__options-trigger {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .d-editor-button-bar .toolbar__button .d-icon,
    .d-editor-button-bar .composer-toggle-switch .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .d-editor-input {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    .d-editor-input::placeholder {
      color: ${GOLD_SOFT} !important;
    }
    .d-editor-preview-wrapper,
    .d-editor-preview {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-left: 1px solid ${BORDER} !important;
    }
    /* 底部提交区域：创建话题 / 舍弃 */
    .submit-panel {
      background-color: ${BG_STRONG} !important;
      border-top: 1px solid ${BORDER} !important;
      color: ${GOLD} !important;
    }
    .submit-panel .btn-primary.create {
      background-color: ${GOLD} !important;
      color: #000000 !important;
      border-color: ${GOLD} !important;
    }
    .submit-panel .btn-primary.create:hover {
      background-color: ${GOLD_SOFT} !important;
    }
    .submit-panel .discard-button {
      background-color: transparent !important;
      color: ${GOLD_SOFT} !important;
    }

    /* 左侧侧边栏整体 */
    .sidebar-wrapper,
    .sidebar-container,
    .sidebar-section-wrapper,
    .sidebar-footer-wrapper {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }

    /* 去掉侧边栏底部白色渐变/阴影 */
    .sidebar-wrapper,
    .sidebar-sections,
    .sidebar-footer-wrapper,
    .sidebar-footer-wrapper::before,
    .sidebar-wrapper::after,
    .sidebar-sections::after {
      background-image: none !important;
      box-shadow: none !important;
    }
    .sidebar-wrapper *,
    .sidebar-footer-wrapper * {
      box-shadow: none !important;
    }

    .sidebar-section-header {
      color: ${GOLD_SOFT} !important;
    }

    /* 侧边栏链接：文字金色，背景黑色 */
    .sidebar-section-link,
    .sidebar-section-link .sidebar-section-link-content-text {
      color: ${GOLD} !important;
      opacity: 1 !important;
    }

    /* 侧边栏图标保持自身颜色，只保证不变暗 */
    .sidebar-section-link .d-icon {
      opacity: 1 !important;
    }

    /* 未读小圆点单独颜色（亮蓝，可自行改） */
    .sidebar-section-link-suffix.icon.unread .d-icon-circle {
      color: #00aeff !important;
      fill: #00aeff !important;
    }

    /* 侧边栏悬停行 */
    .sidebar-section-link:hover,
    .sidebar-section-link:focus {
      background-color: ${BG_SOFT} !important;
    }

    /* 侧边栏底部按钮（聊天等） */
    .sidebar-footer-wrapper .btn,
    .sidebar-footer-wrapper .btn-primary {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
      box-shadow: none !important;
    }

    /* 聊天抽屉整体（c-drawer-routes） */
    .c-drawer-routes {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-left: 1px solid ${BORDER} !important;
      --primary: ${GOLD};
      --primary-low: ${BG_SOFT};
      --secondary: ${BG_MAIN};
      --tertiary-high: ${GOLD_SOFT};
    }
    .c-navbar-container,
    .c-navbar {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-bottom: 1px solid ${BORDER} !important;
    }
    .c-navbar__title,
    .c-navbar__title-text {
      color: ${GOLD} !important;
    }
    .c-navbar__actions .btn,
    .c-navbar__actions .btn .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .chat-drawer-content {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .chat-channel-divider,
    .chat-channel-divider .channel-title {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .channels-list-container,
    .empty-state__container,
    .empty-state,
    .empty-state__title {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .empty-state__cta .btn,
    .empty-state__cta .btn-primary {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .empty-state__cta .btn-primary:hover {
      background-color: ${GOLD} !important;
      color: #000000 !important;
    }
    .c-footer {
      background-color: ${BG_STRONG} !important;
      border-top: 1px solid ${BORDER} !important;
    }
    .c-footer .c-footer__item {
      color: ${GOLD} !important;
    }
    .c-footer .c-footer__item .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .c-footer .c-footer__item.--active {
      background-color: ${BG_SOFT} !important;
    }

    /* 用户页 / 设置页等 */
    .user-main,
    .new-user-wrapper,
    .new-user-content-wrapper,
    .user-content,
    .user-preferences,
    .preferences {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .user-preferences .control-group {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    /* 头像 / 基本信息区 */
    .user-main .collapsed-info,
    .user-main .collapsed-info.about,
    .user-main .collapsed-info.about.no-background,
    .user-main .details,
    .user-main .primary,
    .user-main .primary-textual,
    .user-main .user-profile-names,
    .user-main .bio {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .user-main .user-profile-names__secondary,
    .user-main .user-profile-names__title {
      color: ${GOLD_SOFT} !important;
    }
    .user-main .controls .btn {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    /* 用户主/次导航条（总结 / 活动 / 通知…，以及 所有 / 话题 / 回复…） */
    .user-navigation.user-navigation-primary,
    .user-navigation.user-navigation-secondary,
    .user-navigation .horizontal-overflow-nav,
    .user-navigation .nav-pills.action-list {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .user-navigation .nav-pills.action-list li a {
      background-color: transparent !important;
      color: ${GOLD_SOFT} !important;
    }
    .user-navigation .nav-pills.action-list li a .d-icon {
      color: inherit !important;
      fill: inherit !important;
    }
    .user-navigation .nav-pills.action-list li[aria-current="page"] > a,
    .user-navigation .nav-pills.action-list li[aria-current="location"] > a,
    .user-navigation .nav-pills.action-list li a.active {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
    }
    /* 用户活动列表（post-list / user-stream） */
    .user-stream,
    .user-stream .post-list-item.user-stream-item,
    .user-stream .post-list-item__header,
    .user-stream .excerpt {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .user-stream .post-list-item.user-stream-item:hover {
      background-color: ${BG_SOFT} !important;
    }
    .user-stream .post-list-item__metadata .time .relative-date {
      color: ${GOLD_SOFT} !important;
    }

    /* 用户菜单 / 通知面板 */
    .panel-body-contents,
    .menu-tabs-container,
    .quick-access-panel {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    .top-tabs.tabs-list,
    .bottom-tabs.tabs-list {
      background-color: ${BG_STRONG} !important;
      border-bottom: 1px solid ${BORDER} !important;
    }
    .user-menu-tab {
      color: ${GOLD_SOFT} !important;
    }
    .user-menu-tab .d-icon {
      color: ${GOLD_SOFT} !important;
      fill: ${GOLD_SOFT} !important;
    }
    .user-menu-tab.active,
    .user-menu-tab[aria-selected="true"] {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
    }
    .user-menu-tab.active .d-icon,
    .user-menu-tab[aria-selected="true"] .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .quick-access-panel ul,
    .quick-access-panel li.notification {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
    }
    .quick-access-panel li.notification a {
      color: ${GOLD} !important;
    }
    .quick-access-panel .item-label {
      color: ${GOLD} !important;
    }
    .quick-access-panel .item-description {
      color: ${GOLD_SOFT} !important;
    }
    .icon-avatar__icon-wrapper .d-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .panel-body-bottom {
      background-color: ${BG_STRONG} !important;
      border-top: 1px solid ${BORDER} !important;
    }
    .panel-body-bottom .btn.show-all {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    /* 通知历史页（/u/xxx/notifications 页面） */
    .notification-history.user-stream,
    .notification-history.user-stream .user-notifications-filter,
    .notification-history.user-stream .user-notifications-list {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
    }
    /* 顶部筛选下拉（筛选依据 / 所有） */
    .user-notifications-filter .notifications-filter-header {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    .user-notifications-filter .notifications-filter-header .filter-text,
    .user-notifications-filter .notifications-filter-header .header-text {
      color: ${GOLD} !important;
    }
    .user-notifications-filter .notifications-filter-header .caret-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    /* 通知历史列表每一条 */
    .user-notifications-list li.notification {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-bottom: 1px solid rgba(255,255,255,0.06) !important;
    }
    .user-notifications-list li.notification:hover {
      background-color: ${BG_SOFT} !important;
    }
    .user-notifications-list li.notification a {
      color: ${GOLD} !important;
    }
    .user-notifications-list .item-label {
      color: ${GOLD} !important;
    }
    .user-notifications-list .item-description,
    .user-notifications-list .relative-date {
      color: ${GOLD_SOFT} !important;
    }

    /* 次要信息颜色稍暗一点 */
    .badge-wrapper,
    .post-info,
    .topic-meta-data,
    .topic-status-info,
    .topic-category,
    .topic-list .num,
    .topic-list .views,
    .topic-list .posts {
      color: ${GOLD_SOFT} !important;
    }

    /* 输入框、按钮（全局） */
    #main-outlet input,
    #main-outlet textarea,
    #main-outlet select,
    #main-outlet .select-kit,
    #main-outlet .btn,
    .sidebar-wrapper input,
    .sidebar-wrapper textarea,
    .sidebar-wrapper select,
    .sidebar-wrapper .btn {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    #main-outlet .btn-primary,
    .sidebar-wrapper .btn-primary {
      background-color: ${GOLD} !important;
      color: #000000 !important;
    }
    #main-outlet .btn-primary:hover,
    .sidebar-wrapper .btn-primary:hover {
      background-color: ${GOLD_SOFT} !important;
    }

    /* 链接 */
    #main-outlet a,
    .d-header a,
    .navigation-container a,
    .sidebar-wrapper a {
      color: ${GOLD} !important;
    }
    #main-outlet a:hover,
    .d-header a:hover,
    .navigation-container a:hover,
    .sidebar-wrapper a:hover {
      color: ${GOLD_SOFT} !important;
    }

    /* ---------- 标签 / 顶部提示 / 下拉 ---------- */

    /* 标签：<a class="discourse-tag box">除虫除草</a> */
    .discourse-tag,
    .discourse-tag.box {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    .discourse-tag:hover,
    .discourse-tag.box:hover {
      background-color: ${BG_SOFT} !important;
      color: ${GOLD_SOFT} !important;
    }

    /* 顶部全局提示条 */
    .alert-global-notice,
    #global-notice-alert-global-notice.alert-info {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .alert-global-notice .text,
    .alert-global-notice strong {
      color: ${GOLD} !important;
    }
    .alert-global-notice a {
      color: ${GOLD} !important;
      text-decoration: underline;
    }
    .alert-global-notice a:hover {
      color: ${GOLD_SOFT} !important;
    }

    /* 下拉 header：标签筛选等 */
    .select-kit-header,
    .single-select-header,
    .combo-box-header,
    .tag-drop-header {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border: 1px solid ${BORDER} !important;
    }
    .select-kit-header .select-kit-header-wrapper {
      background-color: transparent !important;
      color: ${GOLD} !important;
    }
    .select-kit-header .select-kit-selected-name,
    .select-kit-header .selected-name,
    .select-kit-header .name {
      color: ${GOLD} !important;
    }
    .select-kit-header .caret-icon {
      color: ${GOLD} !important;
      fill: ${GOLD} !important;
    }
    .select-kit-header:hover {
      background-color: ${BG_SOFT} !important;
    }

    /* 下拉内容区域 */
    .select-kit-body,
    .select-kit-collection,
    .select-kit-collection .select-kit-row {
      background-color: ${BG_MAIN} !important;
      color: ${GOLD} !important;
      border-color: ${BORDER} !important;
    }
    .select-kit-collection .select-kit-row:hover {
      background-color: ${BG_SOFT} !important;
    }

    /* 页脚 */
    .footer {
      background-color: ${BG_STRONG} !important;
      color: ${GOLD} !important;
      border-top: 1px solid ${BORDER} !important;
    }

    /* 金色滚动条（包括侧边栏 / 下拉 / 抽屉等所有可滚动区域） */
    *::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    *::-webkit-scrollbar-track {
      background: ${BG_STRONG};
    }
    *::-webkit-scrollbar-thumb {
      background-color: ${GOLD};
      border-radius: 4px;
    }
    * {
      scrollbar-width: thin;
      scrollbar-color: ${GOLD} ${BG_STRONG};
    }
  `;

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = css;
  document.documentElement.appendChild(style);
})();
