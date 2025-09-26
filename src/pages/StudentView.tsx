import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Mail, Calendar, User, FileText, ClipboardList } from 'lucide-react';

// Mock student data
const mockStudent = {
  id: '1',
  name: 'Carlos Oliveira',
  email: 'carlos@email.com',
  dateOfBirth: '2008-03-15',
  specialNeeds: 'TDAH',
  cuidador: { name: 'Maria Silva', email: 'maria@eduatipico.com' },
  responsavel: { name: 'João Santos', email: 'joao@eduatipico.com' },
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
};

const mockNotas = [
  { id: '1', subject: 'Matemática', value: 8.5, maxValue: 10, date: new Date('2024-01-15'), observation: 'Bom desempenho em operações básicas' },
  { id: '2', subject: 'Português', value: 9.0, maxValue: 10, date: new Date('2024-01-10'), observation: 'Excelente interpretação de texto' },
  { id: '3', subject: 'Ciências', value: 7.5, maxValue: 10, date: new Date('2024-01-05'), observation: 'Precisa melhorar atenção durante experimentos' },
];

const mockLaudos = [
  {
    id: '1',
    type: 'Psicológico',
    professional: 'Dra. Ana Silva',
    crp_crm: 'CRP 12/12345',
    date: new Date('2023-12-01'),
    description: 'Paciente apresenta características compatíveis com TDAH, necessitando acompanhamento especializado e adaptações pedagógicas.',
    recommendations: 'Sessões de terapia comportamental semanal, ambiente de estudo organizado, pausas regulares durante atividades.'
  },
  {
    id: '2',
    type: 'Neurológico',
    professional: 'Dr. Pedro Costa',
    crp_crm: 'CRM 54321',
    date: new Date('2023-11-15'),
    description: 'Exame neurológico confirma diagnóstico de TDAH. Função cognitiva preservada, dificuldades de atenção sustentada.',
    recommendations: 'Medicação conforme prescrição, reavaliação em 6 meses.'
  }
];

export default function StudentView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div>Estudante não encontrado</div>;
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getGradeColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Dashboard
        </Button>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Student Profile */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={mockStudent.avatar} alt={mockStudent.name} />
                  <AvatarFallback className="text-lg">
                    {mockStudent.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{mockStudent.name}</CardTitle>
                <CardDescription>{calculateAge(mockStudent.dateOfBirth)} anos</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {mockStudent.specialNeeds}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{mockStudent.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(mockStudent.dateOfBirth).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="pt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cuidador</p>
                    <p className="text-sm">{mockStudent.cuidador.name}</p>
                    <p className="text-xs text-muted-foreground">{mockStudent.cuidador.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Responsável</p>
                    <p className="text-sm">{mockStudent.responsavel.name}</p>
                    <p className="text-xs text-muted-foreground">{mockStudent.responsavel.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="notas" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notas" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Notas
                </TabsTrigger>
                <TabsTrigger value="laudos" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Laudos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notas">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Notas</CardTitle>
                    <CardDescription>
                      Acompanhe o desempenho acadêmico do estudante
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNotas.map((nota) => (
                        <div key={nota.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium">{nota.subject}</h3>
                              <Badge variant="outline">
                                {nota.date.toLocaleDateString('pt-BR')}
                              </Badge>
                            </div>
                            {nota.observation && (
                              <p className="text-sm text-muted-foreground">
                                {nota.observation}
                              </p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <div className={`text-2xl font-bold ${getGradeColor(nota.value, nota.maxValue)}`}>
                              {nota.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              de {nota.maxValue}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="laudos">
                <Card>
                  <CardHeader>
                    <CardTitle>Laudos e Relatórios</CardTitle>
                    <CardDescription>
                      Documentos médicos e terapêuticos do estudante
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockLaudos.map((laudo) => (
                        <div key={laudo.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge>{laudo.type}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {laudo.date.toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Profissional Responsável
                            </p>
                            <p className="text-sm">
                              {laudo.professional} - {laudo.crp_crm}
                            </p>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Descrição/Diagnóstico
                            </p>
                            <p className="text-sm">{laudo.description}</p>
                          </div>

                          {laudo.recommendations && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">
                                Recomendações
                              </p>
                              <p className="text-sm">{laudo.recommendations}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}