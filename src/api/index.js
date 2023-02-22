import * as tradmark from './product/tradmark';
import * as attr from './product/attr';
import * as spu from './product/spu';
import * as sku from './product/sku';
import * as skutrue from './product/skutrue';

//  引入权限相关接口
import * as permission from './acl/permission';
import * as role from './acl/role';
import * as user from './acl/user';

export default {
    tradmark,
    attr,
    spu,
    sku,
    skutrue,
    user,
    role,
    permission,
}