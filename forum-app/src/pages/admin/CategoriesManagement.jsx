import { useState, useEffect } from 'react';
import { categoriesAPI } from '../../api/categories';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll({ showAll: true });
        setCategories(response.data.categories || response.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await categoriesAPI.create(newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', description: '', color: '#3B82F6' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const toggleCategoryStatus = async (id) => {
    try {
      const category = categories.find(cat => cat._id === id);
      await categoriesAPI.update(id, { isActive: !category.isActive });
      setCategories(categories.map(cat => 
        cat._id === id ? { ...cat, isActive: !cat.isActive } : cat
      ));
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory({
      id: category._id,
      name: category.name,
      description: category.description || '',
      color: category.color || '#3B82F6'
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await categoriesAPI.update(editingCategory.id, {
        name: editingCategory.name,
        description: editingCategory.description,
        color: editingCategory.color
      });
      setCategories(categories.map(cat => 
        cat._id === editingCategory.id 
          ? { ...cat, name: editingCategory.name, description: editingCategory.description, color: editingCategory.color }
          : cat
      ));
      setShowEditModal(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Categories Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-2xl rounded-xl shadow-sm border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color || '#6B7280' }}
                ></div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{category.description || 'No description'}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{category.threadCount || 0} threads</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => toggleCategoryStatus(category._id)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    category.isActive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button 
                  onClick={() => handleEditCategory(category)}
                  className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Edit Category</h2>
                <button onClick={() => setShowEditModal(false)} className="text-white/80 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={editingCategory?.name || ''}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  value={editingCategory?.description || ''}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="color"
                  className="w-full h-10 border border-gray-200 rounded-lg"
                  value={editingCategory?.color || '#3B82F6'}
                  onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Add New Category</h2>
                <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleAddCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="color"
                  className="w-full h-10 border border-gray-200 rounded-lg"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagement;