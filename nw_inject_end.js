/**
 *
 * @description Get Real Time Option Price
 *
 * @version 2021/05/13 ace 初始版本。
 *
 * @author ace
 *
 * @see {@link http://requirejs.org/|RequireJS}
 *
 * @see {@link https://jquery.com/|jQuery}
 *
 * @see {@link https://getbootstrap.com/|Bootstrap · The most popular HTML, CSS, and JS library in the world.}
 *
 * @see {@link http://underscorejs.org/|Underscore.js}
 * @see {@link https://github.com/jashkenas/underscore|jashkenas/underscore: JavaScript's utility _ belt}
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex|tabindex - HTML: HyperText Markup Language | MDN}
 *
 * @see {@link http://backbonejs.org/|Backbone.js}
 * @see {@link https://github.com/jashkenas/backbone|jashkenas/backbone: Give your JS App some Backbone with Models, Views, Collections, and Events}
 * @see {@link https://github.com/jashkenas/backbone/wiki/Tutorials%2C-blog-posts-and-example-sites|Tutorials, blog posts and example sites · jashkenas/backbone Wiki}
 *
 * @see {@link http://tristen.ca/tablesort/|tablesort}
 * @see {@link http://tristen.ca/tablesort/demo/|tablesort}
 * @see {@link https://github.com/tristen/tablesort|GitHub - tristen/tablesort: A small tablesorter in plain JavaScript}
 *
 * @see {@link https://www.w3schools.com/howto/howto_js_sidenav.asp|How To Create a Side Navigation Menu}
 * @see {@link https://www.w3schools.com/howto/howto_css_sidebar_responsive.asp|How To Create a Responsive Sidebar}
 *
 * @see {@link https://github.com/AndreaLombardo/BootSideMenu|AndreaLombardo/BootSideMenu: BootSideMenu is a jQuery plugin to easily build a sliding menu in a Bootstrap based application.}
 * @see {@link https://andrealombardo.github.io/BootSideMenu/index.html|BootSideMenu By Andrea Lombardo}
 * @see {@link https://www.jqueryscript.net/menu/Sliding-Side-Menu-Panel-with-jQuery-Bootstrap-BootSideMenu.html|Sliding Side Menu/Panel with jQuery and Bootstrap - BootSideMenu | Free jQuery Plugins}
 * @see {@link https://www.jqueryscript.net/demo/Sliding-Side-Menu-Panel-with-jQuery-Bootstrap-BootSideMenu/|Boot Side Menu jQuery Plugin Demo}
 *
 * @see {@link https://codepen.io/yavuzselim/pen/LNYrBd|Bootstrap table thead fix tbody scroll}
 * @see {@link https://stackoverflow.com/questions/44360360/tbody-focus-does-not-work|javascript - tbody focus does not work - Stack Overflow}
 * @see {@link https://www.webdeveloper.com/d/165487-set-focus-for-table|Set focus for table - WebDeveloper.com Forums}
 * @see {@link http://extremedev.blogspot.com/2011/03/make-html-elements-like-div-span-table.html|Make HTML elements like DIV, SPAN, Table focusable | ExtremeDev: Development Solutions}
 *
 * @see {@link https://www.geeksforgeeks.org/check-whether-html-element-has-scrollbars-using-javascript/|Check whether HTML element has scrollbars using JavaScript - GeeksforGeeks}
 * @see {@link https://stackoverflow.com/questions/3015523/remove-or-disable-focus-border-of-browser-via-javascript/3015596|html - Remove or disable focus border of browser via javascript - Stack Overflow}
 *
 * @todo 2021/06/25 ace 優化捲軸樣式。
 *
 */

Configuration.loadJS(Configuration.requirejsFile, function() {

	var tag;

	var tableId = 'table' + Math.random().toString(36).substr(2, 6);
	var sideMenuId = 'sideMenu' + Math.random().toString(36).substr(2, 6);

	var optionData = {};
	
	requirejs.config(tw.ace33022.RequireJSConfig);
	
	// Configuration.loadCSS(Configuration["JSLibDir"] + '/tablesort/tablesort.css');
	// Configuration.loadCSS(Configuration["JSLibDir"] + '/bootstrap/BootSideMenu-1.0.0/css/BootSideMenu.css');
	Configuration.loadCSS('stylesheet/tablesort.css');
	Configuration.loadCSS('https://cdn.jsdelivr.net/npm/BootSideMenu@0.0.1/css/BootSideMenu.css');
	
	requirejs(["tw.ace33022.vo.OptionCallTrnLog", "tw.ace33022.vo.OptionPutTrnLog", "tw.ace33022.util.browser.CommonForm", "tablesort.number", "sprintfjs"], function(OptionCallTrnLog, OptionPutTrnLog, CommonForm) {
	
		function loadData() {
		
			var status = '';
		
			CommonForm.showMarqueebar({
			
				"title": "資料載入中‧‧‧",
				"onShownCallback": function(closeMarqueebar) {
				
					jQuery.getJSON('https://script.google.com/macros/s/AKfycbz9p6eDD50vIILu3_i_ehXPrDmNgzMkuCdDvMLbGQDST6UoaEiAZHh7E2ZEXuTQsuef/exec', function(data, textStatus, jqXHR) {
					
						status = textStatus;

						if (textStatus == 'success') {

							// console.log(JSON.stringify(data));

							var arrVO;
							var index;
							var vo;
							
							arrVO = new Array();
							for (index = 0; index < data["call"].length; index++) {
							
								vo = new OptionCallTrnLog();
							
								vo.setValueFromJSONObject(data["call"][index]);
								arrVO.push(vo);
							}
							optionData["call"] = arrVO;

							arrVO = new Array();
							for (index = 0; index < data["put"].length; index++) {
							
								vo = new OptionPutTrnLog();
							
								vo.setValueFromJSONObject(data["put"][index]);
								arrVO.push(vo);
							}
							optionData["put"] = arrVO;
						}	
						
						closeMarqueebar();
					});
				},
				"afterHiddenCallback": function() {
				
					if (status == 'success') {
					
						// Configuration.loadJS(Configuration["JSLibDir"] + '/bootstrap/BootSideMenu-1.0.0/js/BootSideMenu.js', function() {
						Configuration.loadJS('https://cdn.jsdelivr.net/npm/BootSideMenu@0.0.1/js/BootSideMenu.js', function() {
						
							var tag;
							var slideOption = {
							
								"side": "left",
								"pushBody": false,
								"autoClose": true,
								"closeOnClick": true,
								"remember": false,
								"width": "95%",
								"duration": 200
							};
							
							tag = '<div id="' + sideMenuId + '">'
									+ '  <h2>查詢項目</h2>'
									// + '  <a href="#option_item" class="list-group-item" data-toggle="collapse">CALL/PUT</a>'
									// + '  <div class="list-group collapse" id="option_item">'
									// + '  </div>'
									+ '    <a href="#" class="list-group-item active">CALL</a>'
									+ '    <a href="#" class="list-group-item">PUT</a>'
									// + '    <a href="#" class="list-group-item">進階查詢</a>'

									// + '  <a href="#filter_item" class="list-group-item" data-toggle="collapse">過濾條件</a>'
      						// + '  <div class="list-group collapse" id="filter_item">'
									// + '    <a href="#" class="list-group-item">委買價</a>'
									// + '    <a href="#" class="list-group-item">委賣價</a>'
									// + '  </div>'

									+ '</div>';
							jQuery('body').append(tag);
							
							slideOption["onClose"] = function() {
							
								var index;
								var optionType = '';
								var element = jQuery('#' + sideMenuId + ' a');
								
								for (index = 0; index < element.length; index++) {
								
									if (jQuery(element[index]).hasClass('active')) {
									
										optionType = jQuery(element[index]).text();
										break;
									}
								}
								
								if (optionType != '') {
								
									jQuery('#' + tableId + ' > tbody > tr').remove();
									
									createContent(optionType);
								}
							};
							
							jQuery('#' + sideMenuId).BootSideMenu(slideOption);

							// jQuery('#' + sideMenuId).BootSideMenu().close();
							
							jQuery('#' + sideMenuId + ' a').on('click', function(event) {

								event.preventDefault();
								// event.stopPropagation();
							});

							createContent('CALL');
						});
					}
					else {
					
						CommonForm.showMessage('資料載入過程有誤！');
					}
				}
			});
		}
		
		function createContent(optionType) {
		
			CommonForm.showMarqueebar({
			
				"title": "資料處理中‧‧‧",
				"onShownCallback": function(closeMarqueebar) {
				
					var index;
					var tag;
					
					jQuery('#' + tableId + ' > caption').text(optionType.toUpperCase());
					
					for (index = 0; index < optionData[optionType.toLowerCase()].length; index++) {

						vo = optionData[optionType.toLowerCase()][index];

						if ((vo.getBestAskQty() == 0) && (vo.getBestBidQty() == 0)) continue;	// 沒有委買/賣數量就不顯示了。

						tag = ''
								+ '<tr>'
								+ '  <td class="col-xs-2" style="text-align: center; vertical-align: middle;">' + vo.getConMonth() + '</td>'
								+ '  <td class="col-xs-2" style="text-align: right; vertical-align: middle;">' + vo.getStrikePrice() + '</td>'
								+ '  <td class="col-xs-2" style="text-align: right; vertical-align: middle;">' + vo.getTrnQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getBestAskPrice()) + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + vo.getBestAskQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getBestBidPrice()) + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + vo.getBestBidQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getHighPrice()) + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getLowPrice()) + '</td>'
								+ '</tr>';
						jQuery('#' + tableId + ' tbody').append(tag);
						
						jQuery('#' + tableId + ' thead').css('display', 'block');
						jQuery('#' + tableId + ' tbody').css('display', 'block');
						jQuery('#' + tableId + ' tr').css('display', 'block');
						jQuery('#' + tableId + ' th').css('display', 'block');
						jQuery('#' + tableId + ' td').css('display', 'block');
						
						jQuery('#' + tableId + ' thead tr th').css('float', 'left');
						jQuery('#' + tableId + ' tbody tr td').css('float', 'left');
					}

					jQuery('#' + tableId + ' td').css('padding', '1px');
					
					new Tablesort(jQuery('#' + tableId)[0]);
					
					closeMarqueebar();
				},
				"afterHiddenCallback": function() {

					// @todo 2021/05/25 ace 自動聚焦在tbody。
					jQuery('#' + tableId + ' tbody').focus();
				}
			});
		}

		jQuery(window).on('focus', function(event) {

			if ((jQuery('.modal-open').length == 0) && (jQuery('.modal-backdrop').length == 0)) jQuery('#' + tableId + ' tbody').focus();
		});

		tag = ''
				// + '  <table id="' + tableId + '" class="table table-bordered table-hover table-fixed" style="width: 100%; padding-top: 100px;">'
				+ '  <table id="' + tableId + '" class="table table-bordered table-fixed" style="width: 100%;">'
				+ '    <caption style="text-align: center; vertical-align: middle; font-weight: bold;"></caption>'
				+ '    <thead style="overflow-y: scroll;">'
				+ '      <tr>'
				+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">契約月份</th>'
				+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">履約價</th>'
				+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">成交量</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委賣價</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委賣量</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委買價</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委買量</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">最高價</th>'
				+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">最低價</th>'
				+ '      </tr>'
				+ '    </thead>'
				+ '    <tbody tabindex="0" style="overflow-y: scroll;"></tbody>'
				+ '  </table>'
				+ '';
		jQuery('body').append(tag);
		
		// jQuery('#' + tableId + ' tbody').css('height', (window.innerHeight - 45) + 'px');
		jQuery('#' + tableId + ' tbody').css('height', (window.innerHeight - 75) + 'px');
		jQuery('#' + tableId + ' tbody').css('outline', 'none');	// focus tbody時不顯示外框線。
		
		loadData();
	});
});