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
import { ArrowLeft, FileText } from 'lucide-react';

const laudoTypes = [
  'Psicológico',
  'Neurológico',
  'Psiquiátrico',
  'Pedagógico',
  'Fonoaudiológico',
  'Fisioterapêutico',
  'Terapêutico Ocupacional',
  'Médico Geral'
];

const mockStudents = [
  { id: '1', name: 'Carlos Oliveira' },
  { id: '2', name: 'Julia Santos' },
  { id: '3', name: 'Pedro Silva' },
];

export default function LaudoAdd() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    student_id: '',
    type: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    professional: '',
    crp_crm: '',
    recommendations: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.description.length < 10) {
      toast({
        title: "Erro",
        description: "A descrição deve ter pelo menos 10 caracteres.",
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
        description: "Laudo adicionado com sucesso.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar laudo. Tente novamente.",
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
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Adicionar Laudo</CardTitle>
            <CardDescription>
              Registre um novo laudo médico/terapêutico para o estudante
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
                  <Label htmlFor="type">Tipo de Laudo *</Label>
                  <Select onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {laudoTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="professional">Profissional Responsável</Label>
                  <Input
                    id="professional"
                    value={formData.professional}
                    onChange={(e) => handleInputChange('professional', e.target.value)}
                    placeholder="Nome do profissional"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crp_crm">CRP/CRM</Label>
                  <Input
                    id="crp_crm"
                    value={formData.crp_crm}
                    onChange={(e) => handleInputChange('crp_crm', e.target.value)}
                    placeholder="Registro profissional"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data do Laudo *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição/Diagnóstico *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva o diagnóstico, observações e conclusões do laudo"
                  rows={4}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo de 10 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recomendações</Label>
                <Textarea
                  id="recommendations"
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                  placeholder="Recomendações e orientações do profissional (opcional)"
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
                  disabled={loading || !formData.student_id || !formData.type || !formData.description}
                  className="flex-1"
                >
                  {loading ? "Adicionando..." : "Adicionar Laudo"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}