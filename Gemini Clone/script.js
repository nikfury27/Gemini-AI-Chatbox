        const chatWindow = document.getElementById('chat-window');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        

        const API_KEY = "AIzaSyBPxIUWGuwyl-qjWUwvRS5uxwlvW0HiQOg"; 

        function addMessage(message, sender) {
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('flex', 'items-start', 'gap-3', 'message-enter');
            
            if (sender === 'user') {
                messageWrapper.classList.add('justify-end');
                messageWrapper.innerHTML = `
                    <div class="bg-blue-500 text-white p-4 rounded-lg rounded-br-none max-w-md">
                        <p class="text-sm">${message}</p>
                    </div>
                    <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-bold">
                        U
                    </div>
                `;
            } else {
                messageWrapper.innerHTML = `
                    <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                        <svg class="w-5 h-5 gemini-logo-dot" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#grad1)"/></svg>
                    </div>
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg rounded-tl-none max-w-md">
                        <p class="text-sm text-gray-800 dark:text-gray-200">${message}</p>
                    </div>
                `;
            }

            chatWindow.appendChild(messageWrapper);
            
            // Trigger the animation
            setTimeout(() => {
                messageWrapper.style.opacity = '1';
                messageWrapper.style.transform = 'translateY(0)';
            }, 10);

            // Scroll to the bottom
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        // Function to show a typing indicator
        function showTypingIndicator() {
            const typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.classList.add('flex', 'items-start', 'gap-3', 'message-enter');
            typingIndicator.innerHTML = `
                <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <svg class="w-5 h-5 gemini-logo-dot" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="url(#grad1)"/></svg>
                </div>
                <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg rounded-tl-none typing-indicator">
                    <span class="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                    <span class="w-2 h-2 bg-gray-400 rounded-full inline-block"></span>
                </div>
            `;
            chatWindow.appendChild(typingIndicator);
            setTimeout(() => {
                typingIndicator.style.opacity = '1';
                typingIndicator.style.transform = 'translateY(0)';
            }, 10);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        // Function to remove the typing indicator
        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        // Async function to handle sending messages and getting API response
        async function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            chatInput.value = '';
            showTypingIndicator();

            try {
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
                
                const requestBody = {
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }]
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(`API error! status: ${response.status}`);
                }

                const data = await response.json();
                
                removeTypingIndicator();
                
                // Extract the text from the API response
                const geminiResponse = data.candidates[0].content.parts[0].text;
                addMessage(geminiResponse, 'gemini');

            } catch (error) {
                removeTypingIndicator();
                console.error("Error fetching Gemini response:", error);
                addMessage("Sorry, I couldn't get a response. Please check the console for errors.", 'gemini');
            }
        }


        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Trigger initial message animation
        document.addEventListener('DOMContentLoaded', () => {
            const initialMessage = document.querySelector('.message-enter');
            setTimeout(() => {
                initialMessage.style.opacity = '1';
                initialMessage.style.transform = 'translateY(0)';
            }, 100);
        });
