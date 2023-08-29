document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sentiment-form');
    const resultDiv = document.getElementById('result');
    const sentimentLabelElement = document.getElementById('label');
    const sentimentScoreElement = document.getElementById('score');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const text = document.getElementById('text').value;

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `text=${encodeURIComponent(text)}`,
            });

            if (response.ok) {
                const data = await response.json();
                sentimentLabelElement.textContent = data.sentimentLabel;
                sentimentScoreElement.textContent = data.sentimentScore;
                resultDiv.classList.remove('hidden');
            } else {
                console.error('Error analyzing sentiment:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
