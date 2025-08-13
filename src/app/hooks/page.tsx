'use client';

import { useState } from 'react';
import { Navigation } from '@/lib/layout/Navigation';
import { Sidebar } from '@/lib/layout/Sidebar';
import { HookExample } from '@/lib/hooks/components/HookExample';
import { ApiDocumentation } from '@/lib/hooks/components/ApiDocumentation';
import { hooks } from '@/lib/config/hooks';

export default function HooksPage() {
  const [selectedHook, setSelectedHook] = useState(hooks[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activePage="hooks" />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <Sidebar
            title="Hooks 列表"
            items={hooks.map(h => ({ id: h.id, name: h.name }))}
            selectedId={selectedHook.id}
            onSelect={(id) => setSelectedHook(hooks.find(h => h.id === id) || hooks[0])}
            maxHeight="max-h-96"
          />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedHook.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {selectedHook.description}
              </p>

              {/* Examples */}
              <div className="space-y-8">
                {selectedHook.examples.map((example, index) => (
                  <HookExample key={index} example={example} hookId={selectedHook.id} />
                ))}
              </div>

              {/* API Documentation */}
              <ApiDocumentation hookId={selectedHook.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 