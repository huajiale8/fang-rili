let now = new Date()

function main(params) {
	const year = params.getFullYear()
	const month = params.getMonth() + 1
	initTime()
	generateDays()
	now = params
	function initTime() {
		const time = g('#time')
		time.textContent = `${year}年${month}月`
	}
	function generateDays() {
		const 月初 = new Date(year, month - 1, 1)
		const 月初星期几 = 月初.getDay()
		const 月末 = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
		const 月末星期几 = 月末.getDay()
		const 月末几号 = 月末.getDate()
		const 本月天数 = 月末几号

		const list = []
		const days = g('#days')
		days.innerHTML = ''
		let n = 0
		let selectedLi
		for (let index = 1; index < 月初星期几; index++) {
			const li = document.createElement('li')
			const d = new Date(月初 - 86400 * 1000 * index)
			li.textContent = d.getDate()
			li.classList.add('calendar-days-disabled')
			li.onclick = () => {
				if (selectedLi) {
					selectedLi.classList.remove('calendar-days-selected')
				}
				li.classList.add('calendar-days-selected')
				selectedLi = li
			}
			days.prepend(li)
		}

		for (let index = 1; index < 本月天数; index++) {
			const li = document.createElement('li')
			li.textContent = index
			if (
				index === now.getDate() &&
				month === now.getMonth() + 1 &&
				year === now.getFullYear()
			) {
				li.classList.add('calendar-days-today')
			}
			li.onclick = () => {
				if (selectedLi) {
					selectedLi.classList.remove('calendar-days-selected')
				}
				li.classList.add('calendar-days-selected')
				selectedLi = li
			}
			days.append(li)
			n + 1
		}
		for (let index = 月末星期几; index <= 7; index++) {
			const delta = index - 月末星期几
			const li = document.createElement('li')
			const d = new Date(月末 - 0 + 86400 * 1000 * delta)
			li.textContent = d.getDate()
			li.classList.add('calendar-days-disabled')
			li.onclick = () => {
				if (selectedLi) {
					selectedLi.classList.remove('calendar-days-selected')
				}
				selectedLi = li
				li.classList.add('calendar-days-selected')
			}
			days.append(li)
		}
	}
}
main(now)

g('#prevMonth').onclick = () => {
	const 月初 = new Date(now.getFullYear(), now.getMonth(), 1)
	main(new Date(月初 - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
	const 下月初 = new Date(now.getFullYear(), now.getMonth() + 1, 1)
	main(下月初)
}
g('#toDay').onclick = () => {
	main(new Date())
}

function g(selector) {
	return document.querySelector(selector)
}
function gs(selector) {
	return document.querySelectorAll(selector)
}
