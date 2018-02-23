<template>
  <div :id="localId" class="c-app">

    <div class="c-header-left">
      <exempt-button-group
        v-if="!showNoUsers"
        :set-exempt="setExempt"
        :set-unexempt="setUnexempt" />

        <span 
          v-if="!showNoUsers"
          class="c-header-left__exemption-count">
          {{ $t('lblExemptionCount', { exemptionCount }) }}
        </span>
    </div>

    <user-search class="c-header-right" v-if="!showNoUsers" />

    <div class="c-content">
      <table
        class="c-table"
        v-if="hasUsers"
        :summary="$t('ariaTableSummary')">
        <thead class="c-table__header">
          <tr>
            <th class="c-table__header__row__th">
              <input
                :aria-label="$t('ariaSelectUnselectAll')"
                :checked="allSelected"
                type="checkbox"
                class="c-checkbox"
                @change="selectAll">
            </th>
            <!--
            To support both User Information Privacy and RTL, we need to conditionally
            render one of four options. If the API changes in the future to support
            preferred names, this could be reduced or eliminated entirely.
            -->
            <th class="c-table__header__row__th">
              <span v-if="canSeeFirstName">{{ $t('lblFirstName') }}</span>
              <span v-if="canSeeLastName">{{ $t('lblLastName') }}</span>
              <span v-if="!canSeeFirstName && !canSeeLastName">{{ $t('lblUser') }}</span>
            </th>
            <th class="c-table__header__row__th" v-if="canSeeOrgIdColumn">{{ $t('lblOrgDefinedId') }}</th>
            <th class="c-table__header__row__th">{{ $t('lblExemptStatus') }}</th>
          </tr>
        </thead>
        <tbody class="c-table__body">
          <tr class="c-table__body__row" v-for="user in allUsers" :key="user.Identifier">
            <td  class="c-table__body__row__td">
              <input :aria-label="ariaSelectText(user)" type="checkbox" class="c-checkbox" :checked="user.isSelected" @change="toggleSelection(user)">
            </td>
            <td  class="c-table__body__row__td">{{user.fullName}}</td>
            <td  class="c-table__body__row__td" v-if="canSeeOrgIdColumn">{{user.OrgDefinedId}}</td>
            <td  class="c-table__body__row__td">
              <span v-if="isUserExempt(user)">{{ $t('lblExempt') }}</span>
              <span v-else class="c-offscreen">{{ $t('lblNotExempt') }}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <empty-message 
        :query-term="queryTerm"
        :show-empty-search="showEmptySearch"
        :show-no-users="showNoUsers" />

    </div>

    <div class="c-footer">
      <exempt-button-group
        class="bottom-button-group"
        v-if="hasUsers"
        :show-load-more="hasMoreItems"
        :load-more="loadMore"
        :set-exempt="setExempt"
        :set-unexempt="setUnexempt" />
    </div>

    <div class="overlay">
      <transition name="fade">
        <div v-if="isLoading" class="c-loading d2l-partial-render-shimbg2"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EmptyMessage from 'src/components/EmptyMessage.vue'
import ExemptButtonGroup from 'src/components/ExemptButtonGroup.vue'
import UserSearch from 'src/components/UserSearch.vue'

export default {
  name: 'activity-exemptions',
  components: {
    EmptyMessage,
    UserSearch,
    ExemptButtonGroup
  },

  created() {
    const locale = document.documentElement.lang
      || document.documentElement.getAttribute('data-lang-default')
      || 'en'

    this.$i18n.locale = locale.toLowerCase()
  },

  computed: {
    ...mapGetters([
      'allUsers',
      'isUserExempt',
      'exemptionCount',
      'allSelected',
      'hasMoreItems',
      'isLoading',
      'canSeeOrgIdColumn',
      'canSeeFirstName',
      'canSeeLastName',
      'localId',
      'hasUsers',
      'showNoUsers',
      'queryTerm',
      'showEmptySearch',
      'showNoUsers'
    ]),

    ariaSelectText() {
      return (user) => {
        let userIdentifier = user.fullName

        if( !this.canSeeFirstName && !this.canSeeLastName && this.canSeeOrgIdColumn ) {
          userIdentifier += " " + user.OrgDefinedId
        }

        return this.isUserExempt(user) 
        ? this.$t('ariaSelectExemptUser', {fullName: userIdentifier})
        : this.$t('ariaSelectNotExemptUser', {fullName: userIdentifier})
      }
    }
  },

  methods: mapActions([
    'selectAll',
    'toggleSelection',
    'setExempt',
    'setUnexempt',
    'loadMore'
  ])
}
</script>

<style lang="scss">
@import 'css/_colors';
@import 'css/table';
@import 'css/checkbox';
@import 'css/offscreen';
@import 'css/button';
@import 'css/animations';

.c-app {
  display: -ms-grid;
  display: grid;
  
  grid-template-columns: 50% 50%;
  -ms-grid-columns: 50% 50%;
  grid-template-rows: auto;
  -ms-grid-rows: auto;
  color: $d2l-color-ferrite;
  font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  padding-bottom: 50px;
  font-size: 20px;
}

.c {
  @at-root #{&}-header-left {
    grid-row: 1;
    grid-column: 1;

    @at-root #{&}__exemption-count {
      display: block;
      margin-top: 20px;
      font-size: .9rem;
    }
  }

  @at-root #{&}-header-right {
    align-content:flex-start;
    grid-row: 1;
    grid-column: 2;
    -ms-grid-row: 1;
    -ms-grid-column: 2;    
  }

  @at-root #{&}-content {
    grid-row: 2;
    grid-column: span 2;
    -ms-grid-row: 2;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
  }

  @at-root #{&}-footer {
    grid-row: 3;
    grid-column: 1;
    -ms-grid-row: 3;
    -ms-grid-column: 1;
  }
}

c-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.15);
}

</style>
