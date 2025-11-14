
export async function fetchJackets() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/rainy-days');
        if (!response.ok) {
            throw new Error('Failed to fetch jackets');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching jackets:', error);
        alert('There was an error fetching the jackets. Please try again later.' + error);
    }
}

export async function fetchJacketById(id) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch jacket');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching jacket:', error);
        alert('There was an error fetching the jacket. Please try again later.' + error);
    }

}




