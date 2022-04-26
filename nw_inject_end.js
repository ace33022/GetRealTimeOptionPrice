/**
 *
 * @description Get Real Time Option Price
 *
 * @version 2021/05/13 ace 初始版本。
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
 * @see {@link https://cdnjs.com/libraries/tablesort|tablesort - Libraries - cdnjs - The #1 free and open source CDN built to make life easier for developers}
 * @see {@link https://www.jsdelivr.com/package/npm/tablesort|tablesort CDN by jsDelivr - A CDN for npm and GitHub}
 *
 * @see {@link https://www.w3schools.com/howto/howto_js_sidenav.asp|How To Create a Side Navigation Menu}
 * @see {@link https://www.w3schools.com/howto/howto_css_sidebar_responsive.asp|How To Create a Responsive Sidebar}
 *
 * @see {@link https://github.com/AndreaLombardo/BootSideMenu|AndreaLombardo/BootSideMenu: BootSideMenu is a jQuery plugin to easily build a sliding menu in a Bootstrap based application.}
 * @see {@link https://andrealombardo.github.io/BootSideMenu/index.html|BootSideMenu By Andrea Lombardo}
 * @see {@link https://www.jqueryscript.net/menu/Sliding-Side-Menu-Panel-with-jQuery-Bootstrap-BootSideMenu.html|Sliding Side Menu/Panel with jQuery and Bootstrap - BootSideMenu | Free jQuery Plugins}
 * @see {@link https://www.jqueryscript.net/demo/Sliding-Side-Menu-Panel-with-jQuery-Bootstrap-BootSideMenu/|Boot Side Menu jQuery Plugin Demo}
 * @see {@link https://www.jsdelivr.com/package/npm/BootSideMenu|BootSideMenu CDN by jsDelivr - A CDN for npm and GitHub}
 *
 * @see {@link https://codepen.io/yavuzselim/pen/LNYrBd|Bootstrap table thead fix tbody scroll}
 * @see {@link https://stackoverflow.com/questions/44360360/tbody-focus-does-not-work|javascript - tbody focus does not work - Stack Overflow}
 * @see {@link https://www.webdeveloper.com/d/165487-set-focus-for-table|Set focus for table - WebDeveloper.com Forums}
 * @see {@link http://extremedev.blogspot.com/2011/03/make-html-elements-like-div-span-table.html|Make HTML elements like DIV, SPAN, Table focusable | ExtremeDev: Development Solutions}
 *
 * @see {@link https://www.geeksforgeeks.org/check-whether-html-element-has-scrollbars-using-javascript/|Check whether HTML element has scrollbars using JavaScript - GeeksforGeeks}
 * @see {@link https://stackoverflow.com/questions/3015523/remove-or-disable-focus-border-of-browser-via-javascript/3015596|html - Remove or disable focus border of browser via javascript - Stack Overflow}
 *
 * @see {@link https://dotblogs.com.tw/kevinya/2013/10/22/125200|[jQuery]設定或是取得radio button的value或是index | kevinya - 點部落}
 *
 * @author ace
 *
 * @todo 2021/06/25 ace 優化捲軸樣式。
 *
 */

Configuration.loadJS(Configuration.requirejsFile, function() {

	requirejs.config(tw.ace33022.RequireJSConfig);
	
	// Configuration.loadCSS(Configuration["JSLibDir"] + '/tablesort/tablesort.css');
	// Configuration.loadCSS('stylesheet/tablesort.css');
	// Configuration.loadCSS('https://cdn.jsdelivr.net/npm/BootSideMenu@0.0.1/css/BootSideMenu.css');
	// Configuration.loadCSS(Configuration["JSLibDir"] + '/bootstrap/BootSideMenu-1.0.0/css/BootSideMenu.css');
	
	requirejs(["tw.ace33022.vo.OptionCallTrnLog", "tw.ace33022.vo.OptionPutTrnLog", "tw.ace33022.util.browser.CommonForm", "js-logger", "sprintfjs"], function(OptionCallTrnLog, OptionPutTrnLog, CommonForm, Logger) {
	
		function loadData() {
		
			var status = '';
			
			allPeriod = new Array();
		
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
								
								if (_.indexOf(allPeriod, vo.getConMonth()) == -1) allPeriod.push(vo.getConMonth());
								
								allStrikePrice.add(vo.getStrikePrice());
								
								// 只保留有委買/賣數量的資料。
								if ((vo.getBestAskQty() != 0) || (vo.getBestBidQty() != 0)) arrVO.push(vo);
							}
							optionData["call"] = arrVO;

							arrVO = new Array();
							for (index = 0; index < data["put"].length; index++) {
							
								vo = new OptionPutTrnLog();
							
								vo.setValueFromJSONObject(data["put"][index]);
								
								if (_.indexOf(allPeriod, vo.getConMonth()) == -1) allPeriod.push(vo.getConMonth());
								
								allStrikePrice.add(vo.getStrikePrice());
								
								// 只保留有委買/賣數量的資料。
								if ((vo.getBestAskQty() != 0) || (vo.getBestBidQty() != 0)) arrVO.push(vo);
							}
							optionData["put"] = arrVO;
						}	
						
						closeMarqueebar();
					});
				},
				"afterHiddenCallback": function() {
				
					condition["period"] = allPeriod.slice();
					
					if (status == 'success') {
					
						// Configuration.loadJS(Configuration["JSLibDir"] + '/bootstrap/BootSideMenu-1.0.0/js/BootSideMenu.js', function() {
						// Configuration.loadJS('https://cdn.jsdelivr.net/npm/BootSideMenu@0.0.1/js/BootSideMenu.js', function() {
			
						/*
						requirejs(["BootSideMenu"], function(BootSideMenu) {
						
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
									
									createContent();
								}
							};
							
							jQuery('#' + sideMenuId).BootSideMenu(slideOption);

							// jQuery('#' + sideMenuId).BootSideMenu().close();
							
							jQuery('#' + sideMenuId + ' a').on('click', function(event) {

								event.preventDefault();
								// event.stopPropagation();
							});

							createContent();
						});
						*/
						
						createContent();
					}
					else {
					
						CommonForm.showMessage('資料載入過程有誤！');
					}
				}
			});
		}
		
		function createContent() {
		
			CommonForm.showMarqueebar({
			
				"title": "資料處理中‧‧‧",
				"onShownCallback": function(closeMarqueebar) {
				
					function filter() {
					
						var result = new Array();
						
						if (condition["period"].length != 0) {
						
							// console.log('bestBidPrice' + ':' + condition["bestBidPrice"] + '||' + 'bestAskPrice' + ':' + condition["bestAskPrice"]);
						
							// result = optionData[condition["optionType"].toLowerCase()].slice();
							result = optionData[condition["optionType"].toLowerCase()].filter(function(item, index, array) {
							
								var result = false;
								
								if (condition["period"].indexOf(item.getConMonth()) != -1) {
								
									if ((condition["bestAskPrice"] == 0) && (condition["bestBidPrice"] == 0)) {
									
										result = true;
										
										if ((condition["strikePrice"] != '') && (condition["strikeCondition"] != '')) {
										
											result = false;
										
											if (condition["strikeCondition"] == 'eq') {
											
												if (item.getStrikePrice() == condition["strikePrice"]) result = true;
											}
											else if (condition["strikeCondition"] == 'gt') {
											
												if (item.getStrikePrice() > condition["strikePrice"]) result = true;
											}
											else if (condition["strikeCondition"] == 'lt') {
											
												if (item.getStrikePrice() < condition["strikePrice"]) result = true;
											}
										}
									}	
									else {
									
										if ((item.getBestBidPrice() >= parseFloat(condition["bestBidPrice"])) || (item.getBestAskPrice() <= parseFloat(condition["bestAskPrice"]))) {
										
											// console.log(item.getConMonth() + ':' + item.getStrikePrice() + ':' + item.getBestBidPrice() + ':' + item.getBestAskPrice());
										
											result = true;
											
											if ((condition["strikePrice"] != '') && (condition["strikeCondition"] != '')) {
											
												result = false;
											
												if (condition["strikeCondition"] == 'eq') {
												
													if (item.getStrikePrice() == condition["strikePrice"]) result = true;
												}
												else if (condition["strikeCondition"] == 'gt') {
												
													if (item.getStrikePrice() > condition["strikePrice"]) result = true;
												}
												else if (condition["strikeCondition"] == 'lt') {
												
													if (item.getStrikePrice() < condition["strikePrice"]) result = true;
												}
											}
										}
									}
								}
								
								return result;
							});
						}
						
						return result;
					}
					
					var index;
					var tag;
					var arrVO = filter();
		
					jQuery('#' + tableId + ' > tbody > tr').remove();
					
					jQuery('#' + tableId + ' > caption').text(condition["optionType"].toUpperCase());
					
					// for (index = 0; index < optionData[optionType.toLowerCase()].length; index++) {
					for (index = 0; index < arrVO.length; index++) {

						// vo = optionData[optionType.toLowerCase()][index];
						vo = arrVO[index];

						// if ((vo.getBestAskQty() == 0) && (vo.getBestBidQty() == 0)) continue;	// 沒有委買/賣數量就不顯示了。
						
						tag = ''
								+ '<tr>'
								+ '  <td class="col-xs-2" style="text-align: center; vertical-align: middle;">' + vo.getConMonth() + '</td>'
								+ '  <td class="col-xs-2" style="text-align: right; vertical-align: middle;">' + vo.getStrikePrice() + '</td>'
								+ '  <td class="col-xs-2" style="text-align: right; vertical-align: middle;">' + vo.getTrnQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + vo.getBestBidQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + vo.getBestAskQty() + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getBestBidPrice()) + '</td>'
								+ '  <td class="col-xs-1" style="text-align: right; vertical-align: middle;">' + sprintf('%.2f', vo.getBestAskPrice()) + '</td>'
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
					
					// new Tablesort(jQuery('#' + tableId)[0]);
					
					closeMarqueebar();
				},
				"afterHiddenCallback": function() {

					// @todo 2021/05/25 ace 自動聚焦在tbody。
					jQuery('#' + tableId + ' tbody').focus();
				}
			});
		}

		var tableId = 'table' + Math.random().toString(36).substr(2, 6);
		// var sideMenuId = 'sideMenu' + Math.random().toString(36).substr(2, 6);

		var optionData = {};

		var allPeriod = new Array();
		var allStrikePrice = new Set();

		var condition = {

			"optionType": "CALL",
			"period": [],
			"bestBidPrice": 50,
			"bestAskPrice": 5,
			"strikePrice": "",
			"strikeCondition": ""
		};
	
		var tag = ''
						// + '  <table id="' + tableId + '" class="table table-bordered table-hover table-fixed" style="width: 100%; padding-top: 100px;">'
						+ '  <table id="' + tableId + '" class="table table-bordered table-fixed" style="width: 100%;">'
						+ '    <caption style="text-align: center; vertical-align: middle; font-weight: bold; cursor: pointer;"></caption>'
						+ '    <thead style="overflow-y: scroll;">'
						+ '      <tr>'
						+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">契約月份</th>'
						+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">履約價</th>'
						+ '        <th class="col-xs-2" style="text-align: center; vertical-align: middle; padding: 1px;">成交量</th>'
						+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委買量</th>'
						+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委賣量</th>'
						+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委買價</th>'
						+ '        <th class="col-xs-1" style="text-align: center; vertical-align: middle; padding: 1px;">委賣價</th>'
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
		
		jQuery(window).on('focus', function(event) {

			if ((jQuery('.modal-open').length == 0) && (jQuery('.modal-backdrop').length == 0)) jQuery('#' + tableId + ' tbody').focus();
		});
		
		jQuery('#' + tableId + ' > caption').on('click', function(event) {
		
			var btnConfirmId = 'btnConfirm' + Math.random().toString(36).substr(2, 6);
			var inputCALLId = 'inputCALL' + Math.random().toString(36).substr(2, 6);
			var inputPUTId = 'inputPUT' + Math.random().toString(36).substr(2, 6);
			var divPeriodId = 'divPeriod' + Math.random().toString(36).substr(2, 6);
			var inputBestAskPrice = 'inputBestAskPrice' + Math.random().toString(36).substr(2, 6);
			var inputBestBidPrice = 'inputBestBidPrice' + Math.random().toString(36).substr(2, 6);
			var selectStrikePrice = 'selectStrikePrice' + Math.random().toString(36).substr(2, 6);
			var selectStrikeCondition = 'selectStrikeCondition' + Math.random().toString(36).substr(2, 6);

			var tag;
			var modalHeader = null, modalBody = null, modalFooter = null;
			var baseModal;
			
			var confirmed = false;
			
			// console.log(Array.from(allStrikePrice).sort());
			
			tag = '<div class="modal-header"><h4 class="modal-title" style="text-align: center;">篩選條件</h4></div>';
			modalHeader = jQuery(tag);
			
			tag = '<div class="modal-body" style="text-align: left;">'
					+ '  <div class="form-check form-check-inline">'
					+ '    <input type="radio" id="' + inputCALLId + '" name="optionType" class="form-check-input" value="CALL"><label class="form-check-label" for="' + inputCALLId + '">CALL</label>'
					+ '    <input type="radio" id="' + inputPUTId + '" name="optionType" class="form-check-input" value="PUT"><label class="form-check-label" for="' + inputPUTId + '">PUT</label>'
					+ '  </div>'
					+ '  <div id="' + divPeriodId + '" class="form-check">'
					+ '  </div>'
					+ '  <div>'
					+ '    <label class="" for="' + inputBestAskPrice + '">委買價：</label><input type="text" id="' + inputBestBidPrice + '" class="">'	// 如何限定只能輸入數字？！
					+ '    <label class="" for="' + inputBestBidPrice + '">委賣價：</label><input type="text" id="' + inputBestAskPrice + '" class="">'
					+ '  </div>';
					
					if (allStrikePrice.size != 0) {
					
						tag += '  <div>';
						
						// tag += '    <label>履約價：</label>';
						
						tag += '    <label>條件：</label>';
						tag += '    <select id="' + selectStrikeCondition + '">';
						tag += '      <option value=""></option>';
						tag += '      <option value="eq">=</option>';
						tag += '      <option value="gt">></option>';
						tag += '      <option value="lt"><</option>';
						tag += '    </select>';
						
						tag += '    <select id="' + selectStrikePrice + '">';
						tag += '      <option value=""></option>';
						Array.from(allStrikePrice).sort().forEach(function(currentValue, index, array) {
						
							tag += '      <option value="' + currentValue +'">' + currentValue + '</option>';
						});
						tag += '    </select>';
						
						tag += '  </div>';
					}
					
			tag += '</div>';
			modalBody = jQuery(tag);
			
			tag = '<div class="modal-footer">'
					+ '	 <input type="button" id="' + btnConfirmId + '" class="btn btn-primary" value="確認">'
					+ '	 <input type="button" class="btn" data-dismiss="modal" value="取消">'
					+ '</div>';
			modalFooter = jQuery(tag);
			
			baseModal = CommonForm.addBaseModal({
			
				"modalHeader": modalHeader, 
				"modalBody": modalBody,
				"modalFooter": modalFooter
			});
			
			baseModal.on('shown.bs.modal', function() {

				// console.log(jQuery('.modal.fade').css('transition'));
				// console.log(jQuery('.modal.fade').css('transition-duration'));
				// console.log(jQuery('.modal.fade').css('transition-delay'));
				
				jQuery('#' + inputCALLId).prop('checked', true);
				if (condition["optionType"] == 'PUT') jQuery('#' + inputPUTId).prop('checked', true);
				
				allPeriod.forEach(function(currentValue, index, array) {
				
					var inputPeriodId = 'inputPeriod' + Math.random().toString(36).substr(2, 6);
					var tag = '<input type="checkbox" class="form-check-input" name="period" id="' + inputPeriodId +'" value="' + currentValue + '"><label class="form-check-label" for="' + inputPeriodId + '">' + currentValue + '</label>';
					
					if (condition["period"].indexOf(currentValue) != -1) tag = '<input type="checkbox" class="form-check-input" name="period" id="' + inputPeriodId +'" value="' + currentValue + '" checked><label class="form-check-label" for="' + inputPeriodId + '">' + currentValue + '</label>';
					
					modalBody.find('#' + divPeriodId).append(tag);
				});
				
				jQuery('#' + inputBestAskPrice).val(condition["bestAskPrice"]);
				jQuery('#' + inputBestBidPrice).val(condition["bestBidPrice"]);
				
				jQuery('#' + selectStrikePrice).val(condition["strikePrice"]);
				jQuery('#' + selectStrikeCondition).val(condition["strikeCondition"]);
			});
			
			baseModal.on('hidden.bs.modal', function() {
			
				jQuery(this).remove();
				
				if (confirmed) createContent();
			});
			
			jQuery('#' + btnConfirmId).on('click', function(event) {
			
				confirmed = true;
				
				condition["optionType"] = jQuery('input[name*=optionType]:checked').val();
				
				condition["period"].length = 0;
				
				jQuery('input[name*=period]:checked').each(function(index, element) {
				
					condition["period"].push(jQuery(element).val());
				});
				
				condition["bestAskPrice"] = jQuery('#' + inputBestAskPrice).val();
				condition["bestBidPrice"] = jQuery('#' + inputBestBidPrice).val();
				
				condition["strikePrice"] = jQuery('#' + selectStrikePrice).val();
				condition["strikeCondition"] = jQuery('#' + selectStrikeCondition).val();
				
				baseModal.modal('hide');
			});
			
			baseModal.modal('show');
		});
		
		loadData();
	});
});