import { useState, useEffect } from 'react';
import { getUsuarios, getUsuario, deleteUsuario, createUsuario, updateUsuario } from '../../services/usuarioService';
import './Usuarios.css';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchId, setSearchId] = useState('');
  const [formData, setFormData] = useState({ id: null, nome: '', email: '', senha: '' });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await getUsuarios();
      setUsers(data.data || []);
    } catch (err) {
      setError(err.response?.data?.err || err.message || 'Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsuarios();
  }, []);


  const handleSearch = async () => {
    if (!searchId) return fetchUsuarios();
    
    setLoading(true);
    try {
      const data = await getUsuario(searchId);
      setUsers(data ? [data] : []);
      setError(null);
    } catch (err) {
      setError('Usuário não encontrado.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const confirm = window.confirm('Tem certeza que deseja excluir?');
    if (confirm) {
      try {
        await deleteUsuario(id);
        if (formData.id === id) handleCancel(); 
        fetchUsuarios();
      } catch (err) {
        alert('Erro ao excluir usuário.');
      }
    }
  };


  const handleEdit = (user) => {
    setFormData(user);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };


  const handleCancel = () => {
    setFormData({ id: null, nome: '', email: '', senha: '' });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateUsuario(formData.id, formData);
      } else {
        await createUsuario(formData);
      }
      handleCancel();
      fetchUsuarios();
    } catch (err) {
      alert('Erro ao salvar usuário.');
    }
  };

  
    return (
        <div className="page-container">
            <h1>Gerenciamento de Usuários</h1>

            <div className="form-container">
                <h2>{formData.id ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        value={formData.senha}
                        onChange={handleChange}
                        className="input"
                    />
                    
                    <div>
                        {formData.id && (
                            <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{marginRight: '8px'}}>Cancelar</button>
                        )}
                        <button type="submit" className="btn btn-primary">
                            {formData.id ? 'Salvar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>

            <hr className="divider" />

            <div className="search-bar">
                <input
                    type="number"
                    placeholder="Buscar por ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="input"
                />
                <button onClick={handleSearch} className="btn btn-primary">Buscar</button>
            </div>

            {loading && <div className="message">Carregando usuários...</div>}

            {error && <div className="message">Ops! {error}</div>}

            {!loading && !error && users.length === 0 && (
                <div className="message">Nenhum usuário encontrado no momento.</div>
            )}

            {!loading && !error && users.length > 0 && (
                <ul className="users-list">
                    {users.map(user => (
                        <li key={user.id} className="user-card">
                            <div className="user-info">
                                <span className="user-name">{user.nome}</span>
                                <span className="user-email">{user.email}</span>
                            </div>

                            <div className="actions">
                                <span className="status-badge">ID #{user.id}</span>
                                <button onClick={() => handleEdit(user)} className="btn btn-warning">Editar</button>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Usuarios;