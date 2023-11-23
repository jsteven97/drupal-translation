/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,Drupal,once){'use strict';Drupal.webform=Drupal.webform||{};Drupal.webform.formTabs=Drupal.webform.formTabs||{};Drupal.webform.formTabs.options=Drupal.webform.formTabs.options||{};Drupal.behaviors.webformFormTabs={attach:function(context){if(!window.Tabby)return;$(once('webform-tabs','div.webform-tabs',context)).each(function(){var tabIndex=0;if(location.hash){tabIndex=$('a[href="'+Drupal.checkPlain(location.hash)+'"]').data('tab-index');if(typeof tabIndex!=='undefined')location.hash='';}var options=jQuery.extend({'default':'[data-tab-index="'+tabIndex+'"]'},Drupal.webform.formTabs.options);new Tabby('div.webform-tabs .webform-tabs-item-list',options);});}};})(jQuery,Drupal,once);;
(function($,Drupal){function DropButton(dropbutton,settings){const options=$.extend({title:Drupal.t('List additional actions')},settings);const $dropbutton=$(dropbutton);this.$dropbutton=$dropbutton;this.$list=$dropbutton.find('.dropbutton');this.$actions=this.$list.find('li').addClass('dropbutton-action');if(this.$actions.length>1){const $primary=this.$actions.slice(0,1);const $secondary=this.$actions.slice(1);$secondary.addClass('secondary-action');$primary.after(Drupal.theme('dropbuttonToggle',options));this.$dropbutton.addClass('dropbutton-multiple').on({'mouseleave.dropbutton':$.proxy(this.hoverOut,this),'mouseenter.dropbutton':$.proxy(this.hoverIn,this),'focusout.dropbutton':$.proxy(this.focusOut,this),'focusin.dropbutton':$.proxy(this.focusIn,this)});}else this.$dropbutton.addClass('dropbutton-single');}function dropbuttonClickHandler(e){e.preventDefault();$(e.target).closest('.dropbutton-wrapper').toggleClass('open');}Drupal.behaviors.dropButton={attach(context,settings){const dropbuttons=once('dropbutton','.dropbutton-wrapper',context);if(dropbuttons.length){const body=once('dropbutton-click','body');if(body.length)$(body).on('click','.dropbutton-toggle',dropbuttonClickHandler);dropbuttons.forEach((dropbutton)=>{DropButton.dropbuttons.push(new DropButton(dropbutton,settings.dropbutton));});}}};$.extend(DropButton,{dropbuttons:[]});$.extend(DropButton.prototype,{toggle(show){const isBool=typeof show==='boolean';show=isBool?show:!this.$dropbutton.hasClass('open');this.$dropbutton.toggleClass('open',show);},hoverIn(){if(this.timerID)window.clearTimeout(this.timerID);},hoverOut(){this.timerID=window.setTimeout($.proxy(this,'close'),500);},open(){this.toggle(true);},close(){this.toggle(false);},focusOut(e){this.hoverOut.call(this,e);},focusIn(e){this.hoverIn.call(this,e);}});$.extend(Drupal.theme,{dropbuttonToggle(options){return `<li class="dropbutton-toggle"><button type="button"><span class="dropbutton-arrow"><span class="visually-hidden">${options.title}</span></span></button></li>`;}});Drupal.DropButton=DropButton;})(jQuery,Drupal);;
((Drupal)=>{Drupal.theme.dropbuttonToggle=(options)=>`<li class="dropbutton-toggle"><button type="button" class="dropbutton__toggle"><span class="visually-hidden">${options.title}</span></button></li>`;})(Drupal);;
(function($,Drupal,once){'use strict';if(!Drupal.behaviors.dropButton)return;var dropButton=Drupal.behaviors.dropButton;Drupal.behaviors.dropButton={attach:function(context,settings){dropButton.attach(context,settings);$(once('webform-dropbutton','.webform-dropbutton .dropbutton-wrapper',context)).css('visibility','visible');}};})(jQuery,Drupal,once);;
