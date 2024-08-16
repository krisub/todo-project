import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, RequiredEntityData, FilterQuery } from '@mikro-orm/mysql';

@Injectable()
export class GenericService<T extends Object, TKeys extends keyof T> {
    
    constructor(
        protected readonly er: EntityRepository<T>,
    ) { }
    
    get entityManager(): EntityManager {
        return this.er.getEntityManager();
    }

    async getAll(): Promise<T[]> {
        return this.er.find({});
    }

    async getOne(id: FilterQuery<T>): Promise<T | null> {
      return this.er.findOne(id);
    }
  
    async getByKeys(keys: { [K in TKeys]: T[K] }): Promise<T | null> {
        return this.er.findOne(keys as FilterQuery<T>);
    }

    async create(data: RequiredEntityData<T>): Promise<T> {
        const entity = this.er.create(data);
        await this.entityManager.persistAndFlush(entity);
        return entity;
    }

    async update(id: FilterQuery<T>, data: RequiredEntityData<T>): Promise<T | null> {
        const entity = await this.er.findOne(id);
        if (entity) {
            Object.assign(entity, data);
            await this.entityManager.persistAndFlush(entity);
        }
        return entity;
    }

    async delete(id: FilterQuery<T>): Promise<T | null> {
        const entity = await this.er.findOne(id);
        if (entity) {
            await this.entityManager.removeAndFlush(entity);
        }
        return entity;
    }

    async clear(): Promise<void> {
        await this.er.nativeDelete({});
    }
}
