module.exports = function (petId) {
    return `
        <script>
            setTimeout(function() {
                window.location.href = '/appointments/${petId}';
            }, 500);
        </script>
    `;
};