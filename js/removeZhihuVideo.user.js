// ==UserScript==
// @name         移除知乎视频
// @namespace    https://github.com/pcloth/tampermonkey.js
// @version      1.0.1
// @description  移除知乎视频
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

// 隐藏视频
function hideVideo(node) {
	let selectors = ['.ContentItem.ZVideoItem', '.ZVideoItem-video', '.VideoAnswerPlayer']
	for (let i in selectors) {
		node.querySelectorAll(selectors[i]).forEach(item => {
			__video_parent__(item)
		})
	}
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