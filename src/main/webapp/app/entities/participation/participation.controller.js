(function() {
    'use strict';

    angular
        .module('artemisApp')
        .controller('ParticipationController', ParticipationController);

    ParticipationController.$inject = ['Participation', 'ExerciseParticipations', 'exerciseEntity'];

    function ParticipationController (Participation, ExerciseParticipations,  exerciseEntity) {
        var vm = this;

        vm.participations = [];
        vm.sort = sort;
        vm.exercise = exerciseEntity;

        load();

        function getUniqueExercises() {
            var exercises = _.map(vm.participations, function (participation) {
                return participation.exercise;
            });
            vm.exercises = _.uniqBy(exercises, 'title');
        }

        function load() {
            if(vm.exercise) {
                loadForExercise(vm.exercise);
            } else {
                loadAll();
            }
        }

        function loadAll() {
            Participation.query(function(result) {
                vm.participations = result;
                vm.searchQuery = null;
            });
        }

        function loadForExercise(exercise) {
            ExerciseParticipations.query({exerciseId: exercise.id},function(result) {
                vm.participations = result;
            });
        }

        function sort() {
            vm.participations.sort(function (a, b) {
                var result = (a[vm.predicate] < b[vm.predicate]) ? -1 : (a[vm.predicate] > b[vm.predicate]) ? 1 : (
                    (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0
                );
                return result * (vm.reverse ? -1 : 1);
            });
        }
    }
})();
