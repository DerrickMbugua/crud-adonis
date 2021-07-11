import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet';

export default class PetsController {
  public async index (ctx: HttpContextContract) {
    const pet = await Pet.all();
    return pet;
  }

  public async store ({request, response}: HttpContextContract) {
    const body = request.body();
    const pet = await Pet.create(body);
    response.status(202);
    return pet;

  }

  public async show ({params}: HttpContextContract) {
    const pet = await Pet.findByOrFail('id',params.id);
    return pet;
  }

  public async update ({request, params}: HttpContextContract) {
    const pet = await Pet.findByOrFail('id',params.id);
    const body = request.body();
    pet.name = body.name;
    await pet.save();
    return pet;
  }

  public async destroy ({params, response}: HttpContextContract) {
    const pet = await Pet.findByOrFail('id',params.id);
    await pet.delete();
    response.status(204);

  }
}
