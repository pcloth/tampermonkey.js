// ==UserScript==
// @name         移除知乎视频和广告
// @namespace    https://github.com/pcloth/tampermonkey.js/raw/master/js/removeZhihuVideo.user.js
// @version      2021.09.24
// @description  移除知乎视频和广告
// @author       Pcloth
// @match        https://www.zhihu.com/
// @grant        Pcloth
// @license      MIT
// ==/UserScript==


// 查找视频节点的父节点，找到答案卡片，直接移除
function __video_parent__(item) {
	if (item.parentElement.className.includes('Card TopstoryItem')) {
		return item.parentElement.hidden = true;
	} else {
		return __video_parent__(item.parentElement)
	}
}

let selectors = [
	// 视频
	'.ZVideoItem-video', 
	'.VideoAnswerPlayer',
	// 广告
	'.Pc-feedAd-container' 
]

let hiddenString = selectors.join(',')

// 隐藏视频和广告
function hideVideo(node) {
	node.querySelectorAll(hiddenString).forEach(item => {
		__video_parent__(item)
	})
}

(function() {
    'use strict';
    hideVideo(document)
	new MutationObserver((mutations, observer) => {
		for (let m of mutations) {
			for (let node of m.addedNodes) {
				if (node.nodeType === Node.ELEMENT_NODE) {
					hideVideo(node)
				}
			}
		}
	}).observe(document.body, {
		childList: true,
		subtree: true
	})
})();