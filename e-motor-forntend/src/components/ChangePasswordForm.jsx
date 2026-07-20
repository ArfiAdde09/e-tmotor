import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ChangePasswordForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { changePassword } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { success } = await changePassword(formData);
        if (success) {
            closeModal();
        }
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Ubah Password</h2>
            <div>
                <label
                    htmlFor="current_password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password Saat Ini
                </label>
                <input
                    type="password"
                    name="current_password"
                    id="current_password"
                    value={formData.current_password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="new_password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password Baru
                </label>
                <input
                    type="password"
                    name="new_password"
                    id="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label
                    htmlFor="new_password_confirmation"
                    className="block text-sm font-medium text-gray-700"
                >
                    Konfirmasi Password Baru
                </label>
                <input
                    type="password"
                    name="new_password_confirmation"
                    id="new_password_confirmation"
                    value={formData.new_password_confirmation}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
