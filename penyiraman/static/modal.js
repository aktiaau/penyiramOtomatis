document.addEventListener("DOMContentLoaded", function() {
            const editButtons = document.querySelectorAll(".btn-warning");
            editButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const row = this.closest("tr");
                    const plantName = row.cells[1].textContent;
                    const plantCategory = row.cells[2].textContent;

                    document.getElementById("editPlantName").value = plantName;
                    document.getElementById("editPlantCategory").value = plantCategory;
                });
            });
        });