const CHATBOT_CONFIG = {
  supabaseUrl: "https://zkwjgrxpkwultkmtqyma.supabase.co",
  functionUrl: "https://zkwjgrxpkwultkmtqyma.supabase.co/functions/v1/chatbot-proxy",
  systemPrompt:
    "Vous êtes l'assistant virtuel de Nedra Bellahmer, spécialiste en vente de produits cosmétiques (parfums, maquillage, soins du corps, coffrets cadeaux). Répondez avec élégance et professionnalisme aux questions sur les produits et les commandes.",
  businessName: "Nedra Bellahmer",
  whatsappNumber: "21628897456",
  primaryColor: "#B4693E",
  position: "bottom-right",
}

;(function () {
  'use strict'

  const MAX_HISTORY = 10
  const WELCOME_MESSAGE =
    "Bonjour et bienvenue ✨ Je suis l'assistante de Nedra Bellahmer. Parfums, maquillage, soins du corps, coffrets cadeaux... comment puis-je vous aider aujourd'hui ?"
  const FALLBACK_MESSAGE =
    'Je suis momentanément indisponible. Veuillez nous contacter directement par téléphone ou WhatsApp.'

  let conversationHistory = []
  let hasWelcomed = false
  let isSending = false

  let els = {}

  function injectStyles() {
    if (document.getElementById('lrcb-styles')) return

    const isLeft = CHATBOT_CONFIG.position === 'bottom-left'
    const side = isLeft ? 'left' : 'right'

    const css = `
      .lrcb-toggle {
        position: fixed;
        bottom: 90px;
        ${side}: 20px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: ${CHATBOT_CONFIG.primaryColor};
        border: none;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2147483000;
        padding: 0;
        transition: transform 0.15s ease;
      }
      .lrcb-toggle:hover {
        transform: scale(1.06);
      }
      .lrcb-toggle svg {
        width: 27px;
        height: 27px;
      }
      .lrcb-panel {
        position: fixed;
        bottom: 158px;
        ${side}: 20px;
        width: 320px;
        height: 440px;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 2147483000;
        font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      .lrcb-panel[hidden] {
        display: none;
      }
      .lrcb-header {
        background: ${CHATBOT_CONFIG.primaryColor};
        color: #ffffff;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .lrcb-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        overflow: hidden;
      }
      .lrcb-header-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.18);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .lrcb-header-avatar svg {
        width: 16px;
        height: 16px;
      }
      .lrcb-header-title {
        font-size: 14.5px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lrcb-close {
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 22px;
        line-height: 1;
        cursor: pointer;
        padding: 0 0 0 12px;
      }
      .lrcb-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #fffdfa;
      }
      .lrcb-msg {
        max-width: 85%;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 13.5px;
        line-height: 1.4;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .lrcb-msg-user {
        align-self: flex-end;
        background: ${CHATBOT_CONFIG.primaryColor};
        color: #ffffff;
        border-bottom-right-radius: 4px;
      }
      .lrcb-msg-assistant {
        align-self: flex-start;
        background: #f1e9dd;
        color: #241d19;
        border-bottom-left-radius: 4px;
      }
      .lrcb-typing {
        align-self: flex-start;
        background: #f1e9dd;
        border-radius: 12px;
        border-bottom-left-radius: 4px;
        padding: 10px 14px;
        display: flex;
        gap: 4px;
      }
      .lrcb-typing[hidden] {
        display: none;
      }
      .lrcb-typing span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #9c8b76;
        animation: lrcb-bounce 1.2s infinite ease-in-out;
      }
      .lrcb-typing span:nth-child(2) {
        animation-delay: 0.15s;
      }
      .lrcb-typing span:nth-child(3) {
        animation-delay: 0.3s;
      }
      @keyframes lrcb-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
      .lrcb-input-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        padding: 10px;
        border-top: 1px solid #e5e0d5;
        flex-shrink: 0;
      }
      .lrcb-input {
        flex: 1;
        border: 1px solid #d8cdb9;
        border-radius: 16px;
        padding: 8px 14px;
        font-size: 13.5px;
        font-family: inherit;
        outline: none;
        min-width: 0;
        resize: none;
        max-height: 96px;
        overflow-y: auto;
        line-height: 1.4;
      }
      .lrcb-input:focus {
        border-color: ${CHATBOT_CONFIG.primaryColor};
      }
      .lrcb-send {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: none;
        background: ${CHATBOT_CONFIG.primaryColor};
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: 0;
      }
      .lrcb-send:disabled {
        opacity: 0.5;
        cursor: default;
      }
      .lrcb-send svg {
        width: 16px;
        height: 16px;
      }
      .lrcb-whatsapp {
        display: block;
        text-align: center;
        padding: 10px;
        font-size: 12.5px;
        font-weight: 600;
        color: #16a34a;
        text-decoration: none;
        border-top: 1px solid #e5e0d5;
        flex-shrink: 0;
      }
      .lrcb-whatsapp:hover {
        background: #f0fdf4;
      }
      @media (max-width: 480px) {
        .lrcb-panel {
          width: calc(100% - 32px);
          left: 16px;
          right: 16px;
          bottom: 152px;
          height: min(440px, calc(100vh - 200px));
        }
        .lrcb-toggle {
          right: 16px;
          left: auto;
          bottom: 86px;
        }
      }
    `

    const style = document.createElement('style')
    style.id = 'lrcb-styles'
    style.textContent = css
    document.head.appendChild(style)
  }

  // Minimalist outline "perfume bottle + sparkle" mark, on brand with the boutique's cosmetics identity.
  const AVATAR_SVG =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21h6a1 1 0 0 0 1-1v-8a3 3 0 0 0-3-3v-3h1V4h-4v2h1v3a3 3 0 0 0-3 3v8a1 1 0 0 0 1 1Z" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><line x1="9" y1="14" x2="15" y2="14" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M18.5 3.5 19 5l1.5.5L19 6l-.5 1.5L18 6l-1.5-.5L18 5l.5-1.5Z" fill="#fff"/></svg>'

  function buildWidget() {
    const toggle = document.createElement('button')
    toggle.className = 'lrcb-toggle'
    toggle.setAttribute('aria-label', 'Ouvrir le chat')
    toggle.innerHTML = AVATAR_SVG

    const panel = document.createElement('div')
    panel.className = 'lrcb-panel'
    panel.hidden = true

    const header = document.createElement('div')
    header.className = 'lrcb-header'

    const headerLeft = document.createElement('div')
    headerLeft.className = 'lrcb-header-left'

    const avatar = document.createElement('div')
    avatar.className = 'lrcb-header-avatar'
    avatar.innerHTML = AVATAR_SVG

    const title = document.createElement('span')
    title.className = 'lrcb-header-title'
    title.textContent = CHATBOT_CONFIG.businessName

    headerLeft.appendChild(avatar)
    headerLeft.appendChild(title)

    const closeBtn = document.createElement('button')
    closeBtn.className = 'lrcb-close'
    closeBtn.setAttribute('aria-label', 'Fermer le chat')
    closeBtn.innerHTML = '&times;'

    header.appendChild(headerLeft)
    header.appendChild(closeBtn)

    const messages = document.createElement('div')
    messages.className = 'lrcb-messages'

    const typing = document.createElement('div')
    typing.className = 'lrcb-typing'
    typing.hidden = true
    typing.innerHTML = '<span></span><span></span><span></span>'

    const inputRow = document.createElement('div')
    inputRow.className = 'lrcb-input-row'

    const input = document.createElement('textarea')
    input.rows = 1
    input.className = 'lrcb-input'
    input.placeholder = 'Écrivez votre message...'
    input.setAttribute('aria-label', 'Votre message')

    const autoResize = () => {
      input.style.height = 'auto'
      input.style.height = Math.min(input.scrollHeight, 96) + 'px'
    }
    input.addEventListener('input', autoResize)

    const sendBtn = document.createElement('button')
    sendBtn.className = 'lrcb-send'
    sendBtn.setAttribute('aria-label', 'Envoyer')
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2 11 13" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 2 15 22l-4-9-9-4 20-7z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

    inputRow.appendChild(input)
    inputRow.appendChild(sendBtn)

    const whatsapp = document.createElement('a')
    whatsapp.className = 'lrcb-whatsapp'
    whatsapp.href = 'https://wa.me/' + CHATBOT_CONFIG.whatsappNumber
    whatsapp.target = '_blank'
    whatsapp.rel = 'noopener noreferrer'
    whatsapp.textContent = 'Contacter sur WhatsApp'

    panel.appendChild(header)
    panel.appendChild(messages)
    panel.appendChild(typing)
    panel.appendChild(inputRow)
    panel.appendChild(whatsapp)

    document.body.appendChild(toggle)
    document.body.appendChild(panel)

    els = { toggle, panel, closeBtn, messages, typing, input, sendBtn, autoResize }

    toggle.addEventListener('click', openPanel)
    closeBtn.addEventListener('click', closePanel)
    sendBtn.addEventListener('click', handleSend)
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    })
  }

  function openPanel() {
    els.panel.hidden = false
    els.toggle.hidden = true
    if (!hasWelcomed) {
      appendMessage('assistant', WELCOME_MESSAGE)
      hasWelcomed = true
    }
    els.input.focus()
  }

  function closePanel() {
    els.panel.hidden = true
    els.toggle.hidden = false
  }

  function appendMessage(role, text) {
    const msg = document.createElement('div')
    msg.className = 'lrcb-msg ' + (role === 'user' ? 'lrcb-msg-user' : 'lrcb-msg-assistant')
    msg.textContent = text
    els.messages.appendChild(msg)
    els.messages.scrollTop = els.messages.scrollHeight
  }

  function showTyping() {
    els.typing.hidden = false
    els.messages.appendChild(els.typing)
    els.messages.scrollTop = els.messages.scrollHeight
  }

  function hideTyping() {
    els.typing.hidden = true
  }

  function setSending(sending) {
    isSending = sending
    els.sendBtn.disabled = sending
    els.input.disabled = sending
  }

  function trimHistory() {
    if (conversationHistory.length > MAX_HISTORY) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY)
    }
  }

  async function handleSend() {
    const text = els.input.value.trim()
    if (!text || isSending) return

    els.input.value = ''
    els.autoResize()
    appendMessage('user', text)
    setSending(true)
    showTyping()

    try {
      const res = await fetch(CHATBOT_CONFIG.functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          systemPrompt: CHATBOT_CONFIG.systemPrompt,
          history: conversationHistory,
        }),
      })

      if (!res.ok) throw new Error('chatbot-proxy request failed')

      const data = await res.json()
      const reply = typeof data.reply === 'string' && data.reply ? data.reply : FALLBACK_MESSAGE

      hideTyping()
      appendMessage('assistant', reply)

      conversationHistory.push({ role: 'user', content: text })
      conversationHistory.push({ role: 'assistant', content: reply })
      trimHistory()
    } catch (e) {
      hideTyping()
      appendMessage('assistant', FALLBACK_MESSAGE)

      conversationHistory.push({ role: 'user', content: text })
      conversationHistory.push({ role: 'assistant', content: FALLBACK_MESSAGE })
      trimHistory()
    } finally {
      setSending(false)
      els.input.focus()
    }
  }

  function initChatbot() {
    injectStyles()
    buildWidget()
  }

  document.addEventListener('DOMContentLoaded', initChatbot)
})()
