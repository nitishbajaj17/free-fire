        const fontMaps = {
            medieval: {"a":"𝖆","b":"𝖇","c":"𝖈","d":"𝖉","e":"𝖊","f":"𝖋","g":"𝖌","h":"𝖍","i":"𝖎","j":"𝖏","k":"𝖐","l":"𝖑","m":"𝖒","n":"𝖓","o":"𝖔","p":"𝖕","q":"𝖖","r":"𝖗","s":"𝖘","t":"𝖙","u":"𝖚","v":"𝖛","w":"𝖜","x":"𝖝","y":"𝖞","z":"𝖟"},
            cursive: {"a":"𝓪","b":"𝓫","c":"𝓬","d":"𝓭","e":"𝓮","f":"𝓯","g":"𝓰","h":"𝓱","i":"𝓲","j":"𝓳","k":"𝓴","l":"𝓵","m":"𝓶","n":"𝓷","o":"𝓸","p":"𝓹","q":"𝓺","r":"𝓻","s":"𝓼","t":"𝓽","u":"𝓾","v":"𝓿","w":"𝔀","x":"𝔁","y":"𝔂","z":"𝔃"},
            doubleStruck: {"a":"𝕒","b":"𝕓","c":"𝕔","d":"𝕕","e":"𝕖","f":"𝕗","g":"𝕘","h":"𝕙","i":"𝕚","j":"𝕛","k":"𝕜","l":"𝕝","m":"𝕞","n":"𝕟","o":"𝕠","p":"𝕡","q":"𝕢","r":"𝕣","s":"𝕤","t":"𝕥","u":"𝕦","v":"𝕧","w":"𝕨","x":"𝕩","y":"𝕪","z":"𝕫"},
            asian: {"a":"卂","b":"乃","c":"匚","d":"ᗪ","e":"乇","f":"千","g":"Ꮆ","h":"卄","i":"丨","j":"ﾌ","k":"Ҝ","l":"ㄥ","m":"爪","n":"几","o":"ㄖ","p":"卩","q":"Ɋ","r":"尺","s":"丂","t":"ㄒ","u":"ㄩ","v":"ᐯ","w":"山","x":"乂","y":"ㄚ","z":"乙"},
            squares: {"a":"🄰","b":"🄱","c":"🄲","d":"🄳","e":"🄴","f":"🄵","g":"🄶","h":"🄷","i":"🄸","j":"🄹","k":"🄺","l":"🄻","m":"🄼","n":"🄽","o":"🄾","p":"🄿","q":"🅀","r":"🅁","s":"🅂","t":"🅃","u":"🅄","v":"🅅","w":"🅆","x":"🅇","y":"🅈","z":"🅉"},
            future: {"a":"ᗩ","b":"ᗷ","c":"ᑢ","d":"ᕲ","e":"ᘿ","f":"ᖴ","g":"ᘜ","h":"ᕼ","i":"ᓰ","j":"ᒚ","k":"ᖽᐸ","l":"ᒪ","m":"ᘻ","n":"ᘉ","o":"ᓍ","p":"ᕵ","q":"ᕴ","r":"ᖇ","s":"S","t":"ᖶ","u":"ᑘ","v":"ᐺ","w":"ᘺ","x":"᙭","y":"ᖻ","z":"ᗱ"}
        };

        const decorations = [
            text => `꧁${text}꧂`,
            text => `${text}乡`,
            text => `${text}々`,
            text => `${text}᭄`,
            text => `༺${text}༻`,
            text => `${text}࿐`,
            text => `${text}ツ`,
            text => `✿${text}✿`,
            text => `⚡${text}⚡`,
            text => `☬${text}☬`,
            text => `${text}✰`,
            text => `${text}ᴮᵒˢˢ`,
            text => `๖ۣۜ${text}`,
            text => `${text}ᴳᵒᵈ`,
            text => `${text}⚔`,
            text => `☠${text}☠`,
            text => `${text}★`,
            text => `ᴳᵃᵐⁱⁿᵍ${text}࿐`
        ];

        const brackets = ['『』', '【】', '〖〗', '༺༻', '₍₎', '⦅⦆', '〘〙', '⟦⟧', '⟨⟩', '⟪⟫', '⦗⦘', '⦃⦄'];
        const prefixes = ['Pro᭄', 'Gaming࿐', 'Elite⚡', 'King👑', 'Boss⚔️', 'Warrior᭄', 'Legend࿐', 'Ghost☠️', 'Ninja⚡', 'Dragon🔥'];
        const suffixes = ['ツ', '乡', '᭄', '࿐', '☢️', '⚔️', '✰', '★', '᭄', '࿐'];
        const flourishes = [
            '★·.·´¯`·.·★ [[text]] ★·.·´¯`·.·★',
            '▁ ▂ ▄ ▅ ▆ ▇ █ [[text]] █ ▇ ▆ ▅ ▄ ▂ ▁',
            '°°°·.°·..·°¯°·._.· [[text]] ·._.·°¯°·.·° .·°°°',
            '¸,ø¤º°`°º¤ø,¸¸,ø¤º° [[text]] °º¤ø,¸¸,ø¤º°`°º¤ø,¸',
            '•´¯`•. [[text]] .•´¯`•',
            '×º°"˜`"°º× [[text]] ×º°"˜`"°º×'
        ];

        let allStyles = [];
        let visibleCount = 20;
        // Store favorite patterns instead of complete strings
        let favoritePatterns = new Set(JSON.parse(localStorage.getItem('favoritePatterns') || '[]'));

        function convertText(text, style) {
            return text.toLowerCase().split('').map(c => style[c] || c).join('');
        }

        function generateStyle(pattern, text) {
            if (pattern.startsWith('font:')) {
                const fontName = pattern.split(':')[1];
                return convertText(text, fontMaps[fontName]);
            } else if (pattern.startsWith('decoration:')) {
                const index = parseInt(pattern.split(':')[1]);
                return decorations[index](text);
            } else if (pattern.startsWith('bracket:')) {
                const [_, fontName, bracketIndex] = pattern.split(':');
                const bracket = brackets[parseInt(bracketIndex)];
                return `${bracket[0]}${convertText(text, fontMaps[fontName])}${bracket[1]}`;
            } else if (pattern.startsWith('prefix:')) {
                const [_, fontName, prefixIndex, suffixIndex] = pattern.split(':');
                const prefix = prefixes[parseInt(prefixIndex)];
                const styledText = convertText(text, fontMaps[fontName]);
                if (suffixIndex) {
                    const suffix = suffixes[parseInt(suffixIndex)];
                    return `${prefix}${styledText}${suffix}`;
                }
                return `${prefix}${styledText}`;
            } else if (pattern.startsWith('flourish:')) {
                const [_, fontName, flourishIndex] = pattern.split(':');
                return flourishes[parseInt(flourishIndex)].replace('[[text]]', 
                    convertText(text, fontMaps[fontName]));
            }
            return text;
        }

        function getStylePattern(style, text) {
            // Basic font styles
            for (const [fontName, fontMap] of Object.entries(fontMaps)) {
                if (style === convertText(text, fontMap)) {
                    return `font:${fontName}`;
                }
            }

            // Decorations
            for (let i = 0; i < decorations.length; i++) {
                if (style === decorations[i](text)) {
                    return `decoration:${i}`;
                }
            }

            // Brackets with fonts
            for (let i = 0; i < brackets.length; i++) {
                for (const [fontName, fontMap] of Object.entries(fontMaps)) {
                    const bracketStyle = `${brackets[i][0]}${convertText(text, fontMap)}${brackets[i][1]}`;
                    if (style === bracketStyle) {
                        return `bracket:${fontName}:${i}`;
                    }
                }
            }

            // Prefixes and suffixes
            for (let i = 0; i < prefixes.length; i++) {
                for (const [fontName, fontMap] of Object.entries(fontMaps)) {
                    const styledText = convertText(text, fontMap);
                    if (style === `${prefixes[i]}${styledText}`) {
                        return `prefix:${fontName}:${i}`;
                    }
                    for (let j = 0; j < suffixes.length; j++) {
                        if (style === `${prefixes[i]}${styledText}${suffixes[j]}`) {
                            return `prefix:${fontName}:${i}:${j}`;
                        }
                    }
                }
            }

            // Flourishes
            for (let i = 0; i < flourishes.length; i++) {
                for (const [fontName, fontMap] of Object.entries(fontMaps)) {
                    const flourishStyle = flourishes[i].replace('[[text]]', convertText(text, fontMap));
                    if (style === flourishStyle) {
                        return `flourish:${fontName}:${i}`;
                    }
                }
            }

            return null;
        }

        function generateAllStyles(text) {
            const styles = [];
            
            // Basic font styles
            Object.entries(fontMaps).forEach(([fontName, fontMap]) => {
                styles.push(convertText(text, fontMap));
            });

            // Simple decorations
            decorations.forEach(decoration => {
                styles.push(decoration(text));
            });

            // Brackets with fonts
            brackets.forEach((bracket, i) => {
                Object.entries(fontMaps).forEach(([fontName, fontMap]) => {
                    styles.push(`${bracket[0]}${convertText(text, fontMap)}${bracket[1]}`);
                });
            });

            // Prefixes and suffixes with fonts
            prefixes.forEach((prefix, i) => {
                Object.entries(fontMaps).forEach(([fontName, fontMap]) => {
                    const styledText = convertText(text, fontMap);
                    styles.push(`${prefix}${styledText}`);
                    suffixes.forEach((suffix, j) => {
                        styles.push(`${prefix}${styledText}${suffix}`);
                    });
                });
            });

            // Flourishes with fonts
            flourishes.forEach((flourish, i) => {
                Object.entries(fontMaps).forEach(([fontName, fontMap]) => {
                    styles.push(flourish.replace('[[text]]', convertText(text, fontMap)));
                });
            });

            return styles;
        }

        function createStyleCard(style, container, text) {
            const card = document.createElement('div');
            card.className = 'style-card';
            
            const textElement = document.createElement('p');
            textElement.className = 'style-text';
            textElement.textContent = style;
            
            const actions = document.createElement('div');
            actions.className = 'card-actions';
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copiar';
            
            const pattern = getStylePattern(style, text);
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = `favorite-btn ${pattern && favoritePatterns.has(pattern) ? 'active' : ''}`;
            favoriteBtn.textContent = '\u2605';
            
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(style);
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> copiada!';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
                    }, 1500);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
            
            favoriteBtn.addEventListener('click', () => {
                if (!pattern) return;
                
                if (favoritePatterns.has(pattern)) {
                    favoritePatterns.delete(pattern);
                    favoriteBtn.classList.remove('active');
                } else {
                    favoritePatterns.add(pattern);
                    favoriteBtn.classList.add('active');
                }
                localStorage.setItem('favoritePatterns', JSON.stringify([...favoritePatterns]));
                updateFavorites();
            });
            
            actions.appendChild(copyBtn);
            actions.appendChild(favoriteBtn);
            
            card.appendChild(textElement);
            card.appendChild(actions);
            
            container.appendChild(card);
        }

        function updateStyles() {
            const text = document.getElementById('nameInput').value || 'free fire names';
            allStyles = generateAllStyles(text);
            
            const stylesGrid = document.getElementById('stylesGrid');
            stylesGrid.innerHTML = '';
            
            allStyles.slice(0, visibleCount).forEach(style => {
                createStyleCard(style, stylesGrid, text);
            });
            
            document.getElementById('loadMoreBtn').style.display = 
                visibleCount >= allStyles.length ? 'none' : 'block';
                
            updateFavorites();
        }

        function updateFavorites() {
            const favoritesSection = document.getElementById('favoritesSection');
            const favoritesGrid = document.getElementById('favoritesGrid');
            const text = document.getElementById('nameInput').value || 'free fire names';
            
            if (favoritePatterns.size > 0) {
                favoritesSection.style.display = 'block';
                favoritesGrid.innerHTML = '';
                [...favoritePatterns].forEach(pattern => {
                    const style = generateStyle(pattern, text);
                    createStyleCard(style, favoritesGrid, text);
                });
            } else {
                favoritesSection.style.display = 'none';
            }
        }

        document.getElementById('nameInput').addEventListener('input', updateStyles);
        
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            visibleCount = Math.min(visibleCount + 20, allStyles.length);
            updateStyles();
        });

        // Initialize
        updateStyles();