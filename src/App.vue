<template>
  <div :id="localId" class="activity-exemptions">
    <button :aria-label="$t('ariaExempt')" class="d2l-button primary" @click="setExempt">
      {{ $t('btnExempt') }}
    </button>
    <button :aria-label="$t('ariaUnexempt')" class="d2l-button" @click="setUnexempt">{{ $t('btnUnexempt') }}</button>
    <div class="vui-input-search-container">
      <!--
      This innocent looking form is needed because Release Conditions contains
      a form element that traps the enter key forcing the Release Condition
      creation dialog to appear when the user presses enter.
      -->
      <form @keydown.enter.prevent>
        <input
          v-model="searchBy"
          type="search"
          maxlength="60"
          :placeholder="$t('lblSearchPlaceholder')"
          @keyup.enter.prevent.stop="searchUsers(searchBy)"
          ref="searchInput"
          spellcheck="false"
          autocomplete="off">
        <button v-if="showSearchButton(searchBy)" :aria-label="$t('ariaSearchButton')" class="vui-input-search-button" @click="searchUsers(searchBy)"></button>
        <button v-else :aria-label="$t('btnClearSearch')" class="vui-input-search-clear-button" @click="clearResults"></button>
      </form>
    </div>

    <div class="exemptions-count-container">
      <span class="exemption-count" v-if="!showNoUsers">{{ $t('lblExemptionCount', { exemptionCount }) }}</span>
      <div class="clear-results-container">
        <button v-if="showClearButton" class="clear-results-button" @click="clearResults">{{ $t('btnClearSearch') }}</button>
      </div>
    </div>

    <table :summary="$t('ariaTableSummary')" v-if="hasUsers">
      <thead>
        <tr>
          <th>
            <input :aria-label="$t('ariaSelectUnselectAll')" type="checkbox" class="d2l-checkbox" :checked="allSelected" @change="selectAll">
          </th>
          <!--
          To support both User Information Privacy and RTL, we need to conditionally
          render one of four options. If the API changes in the future to support
          preferred names, this could be reduced or eliminated entirely.
           -->
          <th>
            <span v-if="canSeeFirstName">{{ $t('lblFirstName') }}</span>
            <span v-if="canSeeLastName">{{ $t('lblLastName') }}</span>
            <span v-if="!canSeeFirstName && !canSeeLastName">{{ $t('lblUser') }}</span>
          </th>
          <th v-if="canSeeOrgIdColumn">{{ $t('lblOrgDefinedId') }}</th>
          <th>{{ $t('lblExemptStatus') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.Identifier">
          <td>
            <input :aria-label="ariaSelectText(user)" type="checkbox" class="d2l-checkbox" :checked="user.isSelected" @change="toggleSelection(user)">
          </td>
          <td>{{user.fullName}}</td>
          <td v-if="canSeeOrgIdColumn">{{user.OrgDefinedId}}</td>
          <td>
            <span v-if="isUserExempt(user)">{{ $t('lblExempt') }}</span>
            <span v-else class="d2l-offscreen">{{ $t('lblNotExempt') }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="no-results" v-if="showEmptySearch">
      <div class="not-found" v-html="$t('lblNoResultsFound', {queryTerm})"></div>
      <div>{{ $t('lblCheckSpelling') }}</div>
    </div>
    <div class="no-results" v-else-if="showNoUsers">{{ $t('lblNoUsers') }}</div>

    <button
      :aria-label="$t('ariaLoadMore')"
      :disabled="isLoading"
      class="d2l-button"
      v-if="hasMoreItems"
      @click="loadMore">
      {{ $t('btnLoadMore') }}
    </button>

    <button
      :aria-label="$t('ariaExempt')"
      class="d2l-button primary"
      v-if="hasUsers"
      @click="setExempt">
      {{ $t('btnExempt') }}
    </button>

    <button
      :aria-label="$t('ariaUnexempt')"
      class="d2l-button"
      v-if="hasUsers"
      @click="setUnexempt">
      {{ $t('btnUnexempt') }}
    </button>

    <div v-if="isLoading" class="loading d2l-partial-render-shimbg2"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'activity-exemptions',
  data() {
    return {
      searchBy: ''
    }
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
      'showClearButton',
      'showSearchButton',
      'hasUsers',
      'showEmptySearch',
      'showNoUsers',
      'queryTerm'
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

  methods: {
    ...mapActions([
      'loadMore',
      'selectAll',
      'setExempt',
      'setUnexempt',
      'toggleSelection'
    ]),
    clearResults() {
      this.searchBy = ''
      this.$store.dispatch('clearResults')
      this.$refs.searchInput.focus()
    },
    searchUsers(searchBy) {
      this.$store.dispatch('searchUsers', searchBy )
      this.$refs.searchInput.focus()
    }
  }
}
</script>

<style src="./css/style.css" scoped></style>
