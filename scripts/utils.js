// usage: log('inside coolFunc',this,arguments);
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
  	console.log( Array.prototype.slice.call(arguments) );
  }
};

function trim(string) {
	string = string.replace(/(^\s+)|'|"|<|>|\!|\||@|#|$|%|^|\^|\$|\\|\/|&|\*|\(\)|\|\/|;|\+|№|,|\?|:|{|}|\[|\]/g, "");
	return string;
}; 
function slugify(text) {
	// Таблица транслитерации взята из jQuery.liTranslit (http://masscode.ru/index.php/k2/item/28-litranslit)
	en_to_ru = {
		'а': 'a',
		'б': 'b',
		'в': 'v',
		'г': 'g',
		'д': 'd',
		'е': 'e',
		'ё': 'jo',
		'ж': 'zh',
		'з': 'z',
		'и': 'i',
		'й': 'j',
		'к': 'k',
		'л': 'l',
		'м': 'm',
		'н': 'n',
		'о': 'o',
		'п': 'p',
		'р': 'r',
		'с': 's',
		'т': 't',
		'у': 'u',
		'ф': 'f',
		'х': 'h',
		'ц': 'c',
		'ч': 'ch',
		'ш': 'sh',
		'щ': 'sch',
		'ъ': '',
		'ы': 'y',
		'ь': '',
		'э': 'e',
		'ю': 'ju',
		'я': 'ja',
		' ': '-',
		'і': 'i',
		'ї': 'i'
	};
	var trans = new String();
	text = trim(text.toLowerCase());
	for (i = 0; i < text.length; i++) {
		for (key in en_to_ru) {
			val = en_to_ru[key];
			if (key == text[i]) {
				trans += val;
				break
			} else if (key == "ї") {
				trans += text[i]
			};
		};
	};
	return trans;
}