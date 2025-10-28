import { container } from 'tsyringe'
import { ListRolesController } from '../useCases/listRoles/ListRolesController.js'
import { ShowRolesController } from '../useCases/showRole/ShowRoleController.js'
import { CreateRoleController } from '../useCases/createRole/CreateRoleController.js'
import { EditRolesController } from '../useCases/editRole/EditRolesController.js'
import { DeleteRolesController } from '../useCases/deleteRole/DeleteRolesController.js'
import { RolesRepository } from '../repositories/RolesRepository.js'
import { IRolesRepository } from '../repositories/IRolesRepository.js'

container.registerSingleton<IRolesRepository>('RolesRepository',RolesRepository)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRolesController', ShowRolesController)
container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('EditRolesController', EditRolesController)
container.registerSingleton('DeleteRolesController', DeleteRolesController)
