document.addEventListener("DOMContentLoaded", () => {
    // RECIPE FILTER
    const filterButtons = document.querySelectorAll(".filter-btn");
    const recipeCards = document.querySelectorAll(".recipe-card");
    const filterStatus = document.querySelector("#filter-status");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedRegion = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            recipeCards.forEach((card) => {
                const matches =
                    selectedRegion === "all" ||
                    card.dataset.region === selectedRegion;

                card.classList.toggle("hidden", !matches);

                if (matches) {
                    visibleCount++;
                }
            });

            if (filterStatus) {
                filterStatus.textContent =
                    `${visibleCount} recipe(s) displayed.`;
            }
        });
    });

    // FAVORITES USING LOCAL STORAGE
    let favorites = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem("africanFavorites") || "[]"
        );

        if (Array.isArray(saved)) {
            favorites = saved.filter(
                (id) => typeof id === "string"
            );
        }
    } catch (error) {
        favorites = [];
    }

    const favoriteButtons = document.querySelectorAll(".favorite-btn");

    function updateFavoriteButton(button) {
        const isFavorite = favorites.includes(button.dataset.id);

        button.classList.toggle("is-favorite", isFavorite);
        button.setAttribute("aria-pressed", String(isFavorite));
        button.textContent = isFavorite
            ? "♥ Favorited"
            : "♡ Favorite";
    }

    favoriteButtons.forEach((button) => {
        updateFavoriteButton(button);

        button.addEventListener("click", () => {
            const id = button.dataset.id;

            if (favorites.includes(id)) {
                favorites = favorites.filter(
                    (favorite) => favorite !== id
                );
            } else {
                favorites.push(id);
            }

            try {
                localStorage.setItem(
                    "africanFavorites",
                    JSON.stringify(favorites)
                );

                updateFavoriteButton(button);
            } catch (error) {
                alert("Your browser could not save this favorite.");
            }
        });
    });
});