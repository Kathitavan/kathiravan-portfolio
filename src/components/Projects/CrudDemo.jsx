import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiPlusSquare, FiEdit2, FiTrash2, FiActivity } from 'react-icons/fi';

const CrudDemo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Initialize Repository', status: 'done' },
    { id: 2, title: 'Build Project Modal', status: 'in-progress' },
    { id: 3, title: 'Deploy to Production', status: 'pending' }
  ]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, status: 'pending' }]);
    setNewTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setTasks(tasks.map(t => t.id === editingId ? { ...t, title: editTitle } : t));
    setEditingId(null);
  };

  return (
    <div className="glass-card rounded-xl border border-white/10 overflow-hidden relative group transition-all duration-300">
      
      {/* Decorative effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/5 to-[#c084fc]/5 z-0"></div>

      {/* Header */}
      <div className="bg-[#0f172a] px-4 py-3 border-b border-white/5 flex items-center justify-between relative z-10">
        <div className="flex items-center text-sm font-mono text-gray-300">
          <FiActivity className="mr-2 text-[#38bdf8]" />
          <span>crud_module_demo.js</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        </div>
      </div>

      <div className="p-5 relative z-10">
        {/* ADD FORM */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="[Enter new task string...]"
            className="flex-grow bg-[#0a0f1c]/80 border border-gray-700/50 rounded-lg px-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/50 font-mono transition-all"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 hover:border-[#38bdf8]/60 rounded-lg transition-all flex items-center"
          >
            <FiPlusSquare className="mr-2" /> ADD
          </button>
        </form>

        {/* LIST */}
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {tasks.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4 text-sm font-mono text-gray-500">
                 _No tasks found in memory allocation_
               </motion.div>
            ) : tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between bg-gray-800/40 border border-gray-700/30 rounded-lg p-3 group-hover:border-gray-600/50 transition-colors"
              >
                {editingId === task.id ? (
                  <form onSubmit={handleUpdate} className="flex-grow flex gap-2">
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-grow bg-[#0a0f1c] border border-[#c084fc]/50 rounded px-2 py-1 text-sm text-white focus:outline-none font-mono"
                      autoFocus
                    />
                    <button type="submit" className="text-xs text-[#c084fc] px-2 border border-[#c084fc]/30 rounded hover:bg-[#c084fc]/10">SAVE</button>
                    <button type="button" onClick={() => setEditingId(null)} className="text-xs text-gray-400 px-2 border border-gray-700 rounded hover:bg-gray-800">CANC</button>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 truncate mr-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        task.status === 'done' ? 'bg-green-500' : 
                        task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <span className={`text-sm font-mono truncate ${task.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {task.title}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(task)}
                        className="p-1.5 text-gray-400 hover:text-[#c084fc] hover:bg-[#c084fc]/10 rounded border border-transparent hover:border-[#c084fc]/30 transition-all"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(task.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded border border-transparent hover:border-red-400/30 transition-all"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default CrudDemo;
