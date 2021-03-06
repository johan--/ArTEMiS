(function() {
    'use strict';

    angular
        .module('artemisApp')
        .controller('AnswerOptionDetailController', AnswerOptionDetailController);

    AnswerOptionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'AnswerOption', 'MultipleChoiceQuestion'];

    function AnswerOptionDetailController($scope, $rootScope, $stateParams, previousState, entity, AnswerOption, MultipleChoiceQuestion) {
        var vm = this;

        vm.answerOption = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('artemisApp:answerOptionUpdate', function(event, result) {
            vm.answerOption = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
