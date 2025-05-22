if (typeof toast !== "undefined") {
    Toastify({
        text: "<%= toast.message %>",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "<%= toast.type === 'success' ? 'green' : 'red' %>",
    }).showToast();
}
