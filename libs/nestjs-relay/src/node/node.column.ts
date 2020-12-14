import { ColumnOptions, PrimaryColumn } from 'typeorm';

export function NodeIdColumn(options: ColumnOptions = {}): PropertyDecorator {
  return PrimaryColumn({ ...options, type: 'varchar', length: 25 });
}
