import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';

describe('ComentariosController', () => {
  const service = { create: jest.fn(), update: jest.fn(), remove: jest.fn() };
  const controller = new ComentariosController(service as unknown as ComentariosService);

  beforeEach(() => jest.clearAllMocks());

  it('usa a identidade autenticada para criar mesmo quando o corpo informa outro autor', async () => {
    const body = { user_id: 99, content: 'Resposta', product_rating_id: 1 };
    await controller.create(body, 7);
    expect(service.create).toHaveBeenCalledWith(body, 7);
  });

  it('usa a identidade autenticada para editar mesmo quando o corpo informa o dono', async () => {
    const body = { user_id: 99, content: 'Resposta atualizada' };
    await controller.update(1, body, 7);
    expect(service.update).toHaveBeenCalledWith(1, body, 7);
  });

  it('usa a identidade autenticada para excluir', async () => {
    await controller.remove(1, 7);
    expect(service.remove).toHaveBeenCalledWith(1, 7);
  });
});
