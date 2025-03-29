export function formatDateTime(dateStr)  {
	if (!dateStr) 
		return '';
	try {
		// 替换中文日期分隔符（如果有）
		const normalizedDateStr = dateStr.replace(/[年月日]/g, '-').replace(/[时分秒]/g, ':');
		const date = new Date(normalizedDateStr);

		// 如果Date解析失败，尝试其他方式
		if (isNaN(date.getTime())) {
		  // 尝试处理"2023-5-15 19:00"这种格式
		  const [datePart, timePart] = dateStr.split(' ');
		  const [year, month, day] = datePart.split('-');
		  return `${parseInt(month)}月${parseInt(day)}日 ${timePart}`;
		}

		// 成功解析Date对象
		const month = date.getMonth() + 1; // 月份从0开始
		const day = date.getDate();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');

		return `${month}月${day}日 ${hours}:${minutes}`;
	} catch (e) {
		console.error('日期格式错误:', dateStr, e);
		return dateStr; // 返回原格式作为fallback
	}
}