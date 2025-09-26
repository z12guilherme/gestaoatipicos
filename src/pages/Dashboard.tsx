import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  FileText, 
  ClipboardList,
  PlusCircle,
  Eye,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockStudents = [
  { id: '1', name: 'Carlos Oliveira', email: 'carlos@email.com', specialNeeds: 'TDAH' },
  { id: '2', name: 'Julia Santos', email: 'julia@email.com', specialNeeds: 'Autismo' },
  { id: '3', name: 'Pedro Silva', email: 'pedro@email.com', specialNeeds: 'Dislexia' },
];

const mockNotas = [
  { id: '1', student: 'Carlos Oliveira', subject: 'Matemática', value: 8.5, date: new Date() },
  { id: '2', student: 'Julia Santos', subject: 'Português', value: 9.0, date: new Date() },
];

const mockLaudos = [
  { id: '1', student: 'Carlos Oliveira', type: 'Psicológico', date: new Date() },
  { id: '2', student: 'Julia Santos', type: 'Neurológico', date: new Date() },
];

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Cuidador': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Responsavel': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Student': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +2 novos este mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudantes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              Ativos no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notas</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNotas.length}</div>
            <p className="text-xs text-muted-foreground">
              Lançadas este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laudos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLaudos.length}</div>
            <p className="text-xs text-muted-foreground">
              Ativos no sistema
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button asChild className="justify-start">
              <Link to="/users/manage">
                <Settings className="mr-2 h-4 w-4" />
                Gerenciar Usuários
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/cuidador/register">
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar Cuidador
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/responsavel/register">
                <UserPlus className="mr-2 h-4 w-4" />
                Cadastrar Responsável
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/student/register">
                <GraduationCap className="mr-2 h-4 w-4" />
                Cadastrar Estudante
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estudantes Recentes</CardTitle>
            <CardDescription>Últimos estudantes cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge variant="secondary">{student.specialNeeds}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCuidadorDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meus Estudantes</CardTitle>
          <CardDescription>Estudantes sob seus cuidados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStudents.slice(0, 2).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                  <Badge variant="secondary" className="mt-1">{student.specialNeeds}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/student/${student.id}/view`}>
                      <Eye className="mr-1 h-4 w-4" />
                      Ver Detalhes
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/nota/add">
                      <PlusCircle className="mr-1 h-4 w-4" />
                      Adicionar Nota
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderResponsavelDashboard = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meus Filhos</CardTitle>
          <CardDescription>Acompanhe o progresso dos seus filhos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockStudents.slice(0, 1).map((student) => (
              <div key={student.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <Badge variant="secondary" className="mt-1">{student.specialNeeds}</Badge>
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/student/${student.id}/view`}>
                      <Eye className="mr-1 h-4 w-4" />
                      Ver Detalhes
                    </Link>
                  </Button>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">Últimas Notas</h4>
                    <div className="space-y-2">
                      {mockNotas.slice(0, 1).map((nota) => (
                        <div key={nota.id} className="flex justify-between text-sm">
                          <span>{nota.subject}</span>
                          <span className="font-medium">{nota.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Laudos</h4>
                    <div className="space-y-2">
                      {mockLaudos.slice(0, 1).map((laudo) => (
                        <div key={laudo.id} className="text-sm">
                          <Badge variant="outline">{laudo.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Notas</CardTitle>
            <CardDescription>Acompanhe seu desempenho acadêmico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotas.map((nota) => (
                <div key={nota.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{nota.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {nota.date.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{nota.value}</div>
                    <div className="text-xs text-muted-foreground">de 10.0</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meus Laudos</CardTitle>
            <CardDescription>Documentos e relatórios médicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLaudos.map((laudo) => (
                <div key={laudo.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{laudo.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {laudo.date.toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Badge className={getRoleColor(user.role)}>
              {user.role}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Bem-vindo(a), {user.name}! Aqui está um resumo das suas atividades.
          </p>
        </div>

        {user.role === 'Admin' && renderAdminDashboard()}
        {user.role === 'Cuidador' && renderCuidadorDashboard()}
        {user.role === 'Responsavel' && renderResponsavelDashboard()}
        {user.role === 'Student' && renderStudentDashboard()}
      </main>
    </div>
  );
}