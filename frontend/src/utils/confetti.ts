const confetti = () => {
          const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

          // Create confetti elements
          const createConfetti = () => {
                    const confettiCount = 150;
                    const container = document.createElement('div');
                    container.style.position = 'fixed';
                    container.style.top = '0';
                    container.style.left = '0';
                    container.style.width = '100%';
                    container.style.height = '100%';
                    container.style.pointerEvents = 'none';
                    container.style.zIndex = '9999';
                    document.body.appendChild(container);

                    // Create individual confetti elements
                    for (let i = 0; i < confettiCount; i++) {
                              const confetti = document.createElement('div');
                              const color = colors[Math.floor(Math.random() * colors.length)];

                              // Style the confetti
                              confetti.style.position = 'absolute';
                              confetti.style.width = `${Math.random() * 10 + 5}px`;
                              confetti.style.height = `${Math.random() * 5 + 3}px`;
                              confetti.style.backgroundColor = color;
                              confetti.style.boxShadow = `0 0 2px ${color}`;
                              confetti.style.opacity = '0';
                              confetti.style.transform = 'translateY(0px) rotate(0deg)';
                              confetti.style.left = `${Math.random() * 100}vw`;

                              container.appendChild(confetti);

                              // Animate each confetti
                              const randomDuration = Math.random() * 2 + 2; // 2-4 seconds
                              const randomDelay = Math.random() * 0.5; // 0-0.5 seconds delay

                              confetti.animate(
                                        [
                                                  {
                                                            opacity: 1,
                                                            transform: `translateY(-10px) rotate(${Math.random() * 360}deg)`,
                                                  },
                                                  {
                                                            opacity: 1,
                                                            transform: `translateY(${window.innerHeight * 0.7}px) rotate(${Math.random() * 360
                                                                      }deg)`,
                                                  },
                                                  {
                                                            opacity: 0,
                                                            transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720
                                                                      }deg)`,
                                                  },
                                        ],
                                        {
                                                  duration: randomDuration * 1000,
                                                  delay: randomDelay * 1000,
                                                  easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                                                  fill: 'forwards',
                                        }
                              );
                    }

                    // Remove the container after animation
                    setTimeout(() => {
                              document.body.removeChild(container);
                    }, 6000);
          };

          createConfetti();
};

export default confetti;