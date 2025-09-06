<script>
        // Header/Footer Component JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                const navbar = document.getElementById('navbar');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
            });

            // Mobile menu and dropdown functionality
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const navMenu = document.getElementById('nav-menu');

            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    navMenu.classList.toggle('active');
                    
                    if (navMenu.classList.contains('active')) {
                        this.innerHTML = '✕';
                        document.body.classList.add("no-scroll");
                    } else {
                        this.innerHTML = '☰';
                        // Close all dropdowns when menu closes
                        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('mobile-active'));
                        document.querySelectorAll('.dropdown-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
                        document.body.classList.remove("no-scroll");
                    }
                });

                // Close menu when clicking on regular nav links
                document.querySelectorAll('.nav-link:not(.dropdown-trigger)').forEach(link => {
                    link.addEventListener('click', function() {
                        navMenu.classList.remove('active');
                        if (mobileMenuBtn) {
                            mobileMenuBtn.innerHTML = '☰';
                        }
                        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('mobile-active'));
                        document.querySelectorAll('.dropdown-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                        navMenu.classList.remove('active');
                        mobileMenuBtn.innerHTML = '☰';
                        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('mobile-active'));
                        document.querySelectorAll('.dropdown-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
                    }
                });
            }

            // Dropdown functionality
            document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
                trigger.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdown = this.parentNode.querySelector('.dropdown-menu');
                        const arrow = this.querySelector('.dropdown-arrow');
                        
                        if (dropdown.classList.contains('mobile-active')) {
                            dropdown.classList.remove('mobile-active');
                            arrow.style.transform = 'rotate(0deg)';
                        } else {
                            document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('mobile-active'));
                            document.querySelectorAll('.dropdown-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
                            
                            dropdown.classList.add('mobile-active');
                            arrow.style.transform = 'rotate(180deg)';
                        }
                    }
                });
            });

            // Close dropdown menu when clicking on dropdown links
            document.querySelectorAll('.dropdown-link').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        const navMenu = document.getElementById('nav-menu');
                        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                        if (navMenu && mobileMenuBtn) {
                            navMenu.classList.remove('active');
                            mobileMenuBtn.innerHTML = '☰';
                        }
                        document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('mobile-active'));
                        document.querySelectorAll('.dropdown-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
                    }
                });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Initialize map
            const mapOptions = {
                center: [22.210258, 86.897619],
                zoom: 13
            };

            const map = L.map('location-map', mapOptions);
            const layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            map.addLayer(layer);

            map.scrollWheelZoom.disable();
            map.dragging.disable();

            const marker = new L.marker([22.210258, 86.897619], {
                draggable: false,
            });

            map.addLayer(marker);

            const popup = L.popup();

            function onMarkerClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("<p style='font-size:15px;'><b>Suhaana Ghar</b> <br>Village Goshti, Shangarh, HP 175023</p>")
                    .openOn(map);
            }

            marker.on('click', onMarkerClick);
        });


        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                console.log('Page hidden - possible screenshot');
                // Could be screenshot, but also tab switching, etc.
            }
        });
    </script>
