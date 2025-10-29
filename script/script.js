window.onload = () => {
  const links = document.querySelectorAll('.animate_link');

  // Helper: determine direction ('top', 'bottom', 'left', 'right')
  function getHoverDirection(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const fromTop = y < h / 4;
    const fromBottom = y > (h * 3) / 4;
    const fromLeft = x < w / 4;
    const fromRight = x > (w * 3) / 4;

    if (fromTop) return 'top';
    if (fromBottom) return 'bottom';
    if (fromLeft) return 'left';
    return 'right';
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', e => {
      const dir = getHoverDirection(e, link);

      // Reset previous states
      link.classList.remove(
        'fill-left', 'fill-right', 'fill-top', 'fill-bottom',
        'out-left', 'out-right', 'out-top', 'out-bottom'
      );

      // Add entry animation
      link.classList.add('fill-' + dir);
    });

    link.addEventListener('mouseleave', e => {
      const dir = getHoverDirection(e, link); // detect exit direction now

      // Remove entry animation and trigger exit
      link.classList.remove('fill-left', 'fill-right', 'fill-top', 'fill-bottom');
      link.classList.add('out-' + dir);

      // Cleanup classes after animation duration
      setTimeout(() => {
        link.classList.remove('out-left', 'out-right', 'out-top', 'out-bottom');
      }, 400);
    });
  });
};
