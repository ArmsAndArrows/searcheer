<template>
	<div class="code-cards-wrapper">
		<div class="card fancy-shadow">
			<h1>Проверка, находится ли элемент в области видимости</h1>
			<p>
				Вставьте следующий JavaScript:<br /><br />
				<code>
					function isElementInViewport(el) {<br />
					&nbsp;&nbsp;const rect = el.getBoundingClientRect();<br />
					&nbsp;&nbsp;return (rect.top >= 0 && rect.left >= 0 &&<br />
					&nbsp;&nbsp;&nbsp;&nbsp;rect.bottom <= (window.innerHeight
					|| document.documentElement.clientHeight) &&<br />
					&nbsp;&nbsp;&nbsp;&nbsp;rect.right <= (window.innerWidth ||
					document.documentElement.clientWidth));<br />
					}
				</code>
			</p>
		</div>

		<div class="card fancy-shadow">
			<h1>Установка таймера обратного отсчета</h1>
			<p>
				Используйте следующий JavaScript код:<br /><br />
				<code>
					let countdown = 10;<br />
					const timer = setInterval(function() {<br />
					&nbsp;&nbsp;console.log(countdown);<br />
					&nbsp;&nbsp;countdown--; <br />
					&nbsp;&nbsp;if (countdown < 0) clearInterval(timer);<br />
					}, 1000);
				</code>
			</p>
		</div>

		<div class="card fancy-shadow">
			<h1>Копирование текста в буфер обмена</h1>
			<p>
				Вставьте этот код в ваш JavaScript:<br /><br />
				<code>
					function copyToClipboard(text) {<br />
					&nbsp;&nbsp;navigator.clipboard.writeText(text).then(() =>
					{<br />
					&nbsp;&nbsp;&nbsp;&nbsp;console.log('Текст скопирован в
					буфер обмена!');<br />
					});<br />
					}
				</code>
			</p>
		</div>

		<div class="card fancy-shadow">
			<h1>Фильтрация массива</h1>
			<p>
				Используйте следующий JavaScript код:<br /><br />
				<code>
					const numbers = [1, 2, 3, 4, 5];<br />
					const evenNumbers = numbers.filter(num => num % 2 === 0);<br />
					console.log(evenNumbers); // [2, 4]
				</code>
			</p>
		</div>
		<div class="card fancy-shadow">
			<h1>Создание выпадающего списка</h1>
			<p>
				Используйте следующий HTML и JavaScript:<br /><br />
				<code>
					&lt;select id="mySelect"&gt;<br />
					&nbsp;&nbsp;&lt;option value="1"&gt;Опция
					1&lt;/option&gt;<br />
					&nbsp;&nbsp;&lt;option value="2"&gt;Опция
					2&lt;/option&gt;<br />
					&lt;/select&gt;<br />
					<br />
					document.getElementById('mySelect').addEventListener('change',
					function() {<br />
					&nbsp;&nbsp;console.log(this.value);<br />
					});
				</code>
			</p>
		</div>

		<div class="card fancy-shadow">
			<h1>Временные рамки</h1>
			<p>
				<code>
					function isOutsideTimeRange() {<br />
					const now = new Date();<br /><br />
					const options = { timeZone: 'Europe/Moscow', hour:
					'numeric', minute: 'numeric', hour12: false }; <br /><br />
					const timeInNovorossiysk = new Intl.DateTimeFormat('en-US',
					options).format(now); <br /><br />
					const [hours, minutes] =
					timeInNovorossiysk.split(':').map(Number);<br /><br />
					const startHour = 10; <br /><br />
					const endHour = 15; <br /><br />
					return (hours &lt; startHour) || (hours > endHour) || (hours
					=== startHour && minutes === 0) || (hours === endHour &&
					minutes > 0);<br /><br />
					}<br /><br />
					if (isOutsideTimeRange()) {<br />
					******<br />
					} else {<br />
					*****<br />
					} </code
				><br /><br />
			</p>
		</div>
	</div>
</template>

<style scoped>
code {
	background-color: var(--c-code-bg);
	display: block;
	line-height: 200%;
	padding: 1.2rem 2rem;
	border-radius: 0.4rem;
	font-family: "Courier New", Courier, monospace;
	font-size: 1.8rem;
	color: var(--c-blue-main);
}
h1 {
	font-size: 4rem;
	font-weight: 700;
	letter-spacing: 0.1rem;
}
p {
	font-size: 2rem;
	margin-top: 2.4rem;
	color: var(--c-white-a-80);
}
.code-cards-wrapper {
	display: grid;
	place-content: center;
	align-self: center;
	width: 100%;
	max-width: 79.4rem;

	color: var(--c-white-main);
}
.card {
	border: 1px solid var(--c-border);
	min-width: 34rem;
	margin-bottom: 2rem;

	background: var(--c-black-main);
	padding: 2.4rem 3.2rem 3.2rem;
	border-radius: 1.2rem;
}

@media screen and (max-width: 600px) {
	.card {
		width: 90vw;
	}
}
</style>
