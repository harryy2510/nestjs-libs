import { ColumnOptions, getMetadataArgsStorage } from 'typeorm';
import { GeneratedMetadataArgs } from 'typeorm/metadata-args/GeneratedMetadataArgs';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
type NodeColumnOptions = Pick<
  ColumnCommonOptions,
  'name' | 'comment' | 'transformer'
>;

export function NodeColumn(
  inputOptions: NodeColumnOptions = {},
): PropertyDecorator {
  const options: ColumnOptions = {
    ...inputOptions,
    type: 'uuid',
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    options.primary = true;
    getMetadataArgsStorage().columns.push({
      target: object.constructor,
      propertyName: propertyName,
      mode: 'regular',
      options,
    });
    getMetadataArgsStorage().generations.push({
      target: object.constructor,
      propertyName: propertyName,
      strategy: 'uuid',
    } as GeneratedMetadataArgs);
  };
}
