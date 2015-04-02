/// <reference path="../apimanPlugin.ts"/>
/// <reference path="../services.ts"/>
module Apiman {

    export var EditPolicyDefController = _module.controller("Apiman.EditPolicyDefController",
        ['$q', '$scope', '$location', 'ApimanSvcs', 'PageLifecycle', '$routeParams',
        ($q, $scope, $location, ApimanSvcs, PageLifecycle, $routeParams) => {
            var params = $routeParams;
            
            var pageData = {
                policyDef: $q(function(resolve, reject) {
                    ApimanSvcs.get({ entityType: 'policyDefs', secondaryType: params.policyDef }, function(policyDef) {
                        resolve(policyDef);
                        $scope.policyDefJSON = JSON.stringify(policyDef, null, 2);
                    }, reject);
                })
            };
            
            $scope.updatePolicyDef  = function() {
                var policyDefUpdate:any = {};
                var policyDef = JSON.parse($scope.policyDefJSON);
                policyDefUpdate.name = policyDef.name
                policyDefUpdate.description = policyDef.description;
                policyDefUpdate.icon = policyDef.icon;
                
                ApimanSvcs.update({ entityType: 'policyDefs', secondaryType: $scope.policyDef.id }, policyDefUpdate, function(reply) {
                     PageLifecycle.redirectTo('/admin/policyDefs');
                }, PageLifecycle.handleError);
            }
            
            PageLifecycle.loadPage('EditPolicyDef', pageData, $scope, function() {
                PageLifecycle.setPageTitle('edit-policyDef');
            });
    }])

}