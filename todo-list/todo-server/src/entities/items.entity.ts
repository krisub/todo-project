import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'items' })
export class Item {
  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property()
  done!: boolean;

  @Property({ version: true })
  version!: number;
}
