'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Desplazamiento automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ocultar mensaje de bienvenida cuando comienza la conversación
  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Encabezado */}
      <div className="bg-indigo-600 text-white p-4">
        <h2 className="text-xl font-bold">Asistente Educativo NooVentus</h2>
        <p className="text-sm opacity-80">Tu compañero de reflexión y aprendizaje</p>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 p-4 overflow-y-auto">
        {showWelcome && (
          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-indigo-800">¡Bienvenido al Asistente Educativo NooVentus!</h3>
            <p className="mt-2 text-gray-700">
              Estoy aquí para acompañarte en tu proceso de aprendizaje a través de la reflexión crítica y el pensamiento autónomo.
              No te daré respuestas directas, sino que te guiaré con preguntas que te ayuden a desarrollar tus propias conclusiones.
            </p>
            <p className="mt-2 text-gray-700">
              ¿En qué tema te gustaría reflexionar hoy?
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe tu pregunta o reflexión..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
