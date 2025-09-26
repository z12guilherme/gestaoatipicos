import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ClipboardList } from 'lucide-react';

const subjects = [
  'Matemática',
  'Português',
  'História',
  'Geografia',
  'Ciências',
  'Inglês',
  'Educação Física',
  'Artes',
  'Música'
];

const mockStudents = [
  { id: '1', name: 'Carlos Oliveira' },
  { id: '2', name: 'Julia Santos' },
  { id: '3', name: 'Pedro Silva' },
];

export default function NotaAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    student_id: '',
    subject: '',
    value: '',
    maxValue: '10',
    date: new Date().toISOString().split('T')[0],
    observation: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const noteValue = parseFloat(formData.value);
    const maxValue = parseFloat(formData.maxValue);

    if (noteValue < 0 || noteValue > maxValue) {
      toast({
        title: "Erro",
        description: `A nota deve estar entre 0 e ${maxValue}.`,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sucesso!",
        description: "Nota adicionada com sucesso.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar nota. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-6 px-4 max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Dashboard
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Adicionar Nota</CardTitle>
            <CardDescription>
              Registre uma nova nota para o estudante
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="student">Estudante *</Label>
                  <Select onValueChange={(value) => handleInputChange('student_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estudante" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Matéria *</Label>
                  <Select onValueChange={(value) => handleInputChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a matéria" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="value">Nota *</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.1"
                    min="0"
                    max={formData.maxValue}
                    value={formData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    placeholder="0.0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxValue">Nota Máxima</Label>
                  <Input
                    id="maxValue"
                    type="number"
                    step="0.1"
                    min="1"
                    value={formData.maxValue}
                    onChange={(e) => handleInputChange('maxValue', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observation">Observações</Label>
                <Textarea
                  id="observation"
                  value={formData.observation}
                  onChange={(e) => handleInputChange('observation', e.target.value)}
                  placeholder="Observações sobre a avaliação (opcional)"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.student_id || !formData.subject || !formData.value}
                  className="flex-1"
                >
                  {loading ? "Adicionando..." : "Adicionar Nota"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}